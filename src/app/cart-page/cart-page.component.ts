import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {
  customNum: number = 1;
  pageObj: any = {
    page: 0,
    size: 5,
    totalElements: 0
  };
  cartCount: number = 0;
  addedCartItems = [];

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    private http: HttpClient) { }


  removeTocart(id) { }

  addItems(type) {
    if (type == 'add' && this.customNum < 20) {
      this.customNum += 1;
    } else if (type == 'minus' && this.customNum > 1) {
      this.customNum -= 1;
    }
  }
  pageChanged(event): void {
    this.pageObj.page = event.pageIndex;
    this.pageObj.size = event.pageSize;
    this.getProductsList();
  }
  getProductsList() {
    this.http.get(`https://fakestoreapi.com/products?page=${this.pageObj.page}&limit=${this.pageObj.size}`).subscribe((res: any) => {
      if (res) {
        this.pageObj.totalElements = parseInt(res.length);
      }
    })
  }
  goToCart() {
    if (this.addedCartItems.length) {
      localStorage.setItem("addedItems", JSON.stringify(this.addedCartItems));
    }
    this.router.navigate(['cart-page']);
  }
  getCartCount() {
    this.cartCount = this.addedCartItems.length;
  }

  ngOnInit() {
    this.addedCartItems = JSON.parse(localStorage.getItem("addedItems"));
    this.getProductsList();
    this.getCartCount();
  }
}
