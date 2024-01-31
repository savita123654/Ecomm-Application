import { Component, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  cartCount: number = 0;
  // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private router: Router,
    private http: HttpClient) { }
  pagedList: any[];
  products: any[] = [];
  addedCartItems = [];
  pageObj: any = {
    page: 0,
    size: 5,
    totalElements: 5
  };

  pageChanged(event): void {
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.products.length) {
      endIndex = this.products.length;
    }
    this.pagedList = this.products.slice(startIndex, endIndex);
  }

  getProductsList() {
    this.http.get(`https://fakestoreapi.com/products?limit=8`)
      .subscribe((res: any) => {
        if (res) {
          this.products = this.products.concat(res);
          // this.pagedList = this.products.slice(0, 5);
          // this.pageObj.totalElements = this.products.length;
        }
      })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    // Check if the user has scrolled to the bottom
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      this.getProductsList();
    }
  }
  goToCart() {
    if (this.addedCartItems.length) {
      localStorage.setItem("addedItems", JSON.stringify(this.addedCartItems));
    }
    this.router.navigate(['cart-page']);
  }

  addToCart(product, index) {
    this.pagedList.forEach((obj, idx) => {
      if (idx == index) {
        obj.disabled = true;
      }
    })

    this.addedCartItems.push(product);
    localStorage.setItem("addedItems", JSON.stringify(this.addedCartItems));
    console.log(this.pagedList);
    this.getCartCount()
  }

  getCartCount() {
    this.cartCount = this.addedCartItems.length
  }

  ngOnInit() {

    if (JSON.parse(localStorage.getItem("addedItems"))) {
      this.addedCartItems = JSON.parse(localStorage.getItem("addedItems"));
    }
    this.getProductsList();
    this.getCartCount();
  }

}
