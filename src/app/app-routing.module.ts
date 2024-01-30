import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CartPageComponent } from './cart-page/cart-page.component';

const routes: Routes = [
  { component: HomeComponent, path: '' },
  { component: CartPageComponent, path: 'cart-page' },
  { redirectTo: '/', path: '**' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
