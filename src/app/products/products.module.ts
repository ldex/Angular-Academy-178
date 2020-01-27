import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderBy } from './orderBy.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './product.service';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductListComponent,
    OrderBy,
    ProductInsertComponent
  ],
  exports: [ProductListComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
