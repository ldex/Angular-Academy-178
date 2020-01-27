import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Store';
  isDarkTheme = false;

  constructor(
    private router: Router,
    private titleService: Title) {
    
    router
      .events
      .pipe(
        filter((evt:RouterEvent) => evt instanceof NavigationEnd && evt.url == '/products')
      )
      .subscribe(() => {
          this.titleService.setTitle('Products List');
      })
      
  }
}
