import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Product } from '../product.interface';
import { FavouriteService } from '../favourite.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../product.service';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  @Input() product: Product;
  @Output() favouriteAdded: EventEmitter<Product> = new EventEmitter();
  @ViewChild('dialog', {static: false}) dialogTemplate :any;

  confirmDeleteProduct(id: number) {
    let dialogRef = this.dialog.open(this.dialogTemplate);
    dialogRef.afterClosed().subscribe(deleteConfirmed => {
      if (deleteConfirmed) {
        this.deleteProduct(id);
      }
    });
  }

  constructor(
    private favouriteService: FavouriteService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    public dialog: MatDialog) { 
  }

  deleteProduct(id: number) {
      this
      .productService
      .deleteProduct(id)
      .subscribe(
        () => {
          this.productService.ConfirmAndLog('Product deleted!');
          this.productService.initProducts();
          this.router.navigateByUrl('/products?refresh');
        },
        error => this.productService.ConfirmAndLog('Could not delete product: ' + error)
      )
  }

  addToFavourites(product: Product) {
    this.favouriteAdded.emit(product);
    this.productService.ConfirmAndLog('Product in favourites!');
    this.favouriteService.addToFavourites(product);
  }

  ngOnInit() {


    const id: number = + this.activatedRoute.snapshot.params['id'];
    this
      .productService
      .products$
      .pipe(
        map(products => products.find(p => p.id === id))
      )
      .subscribe(
        product => { 
          this.product = product;
          this.titleService.setTitle('Product: ' + product.name);
        }
      )
  }

}
