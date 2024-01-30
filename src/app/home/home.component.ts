import { Component, ViewChild } from '@angular/core';
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
  products: any[];
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
    this.http.get(`https://fakestoreapi.com/products`)
      .subscribe((res: any) => {
        if (res) {
          this.products = res;
          this.pagedList = this.products.slice(0, 5);
          this.pageObj.totalElements = this.products.length;
        }
      })
  }

  goToCart() {
    if (this.addedCartItems.length) {
      localStorage.setItem("addedItems", JSON.stringify(this.addedCartItems));
    }
    this.router.navigate(['cart-page']);
  }

  addToCart(product) {
    this.addedCartItems.push(product);
    console.log(this.addedCartItems)
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
