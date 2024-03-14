import { Component, OnInit } from '@angular/core';
import { ProductService } from './services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce';

  cartProducts: any[] = [];
  subTotal: number = 0;
  constructor(private productService: ProductService, private router: Router){
    this.productService.cartAddedSubject.subscribe((res: any) => {
      this.loadCart();
    })
  }
  ngOnInit(): void {
    this.loadCart();
  }
  redirectToSale(){
    this.router.navigateByUrl('sale')
  }
  loadCart(){
    this.subTotal = 0;
    this.productService.getCartItemsByCustomerId(1).subscribe((res: any) => {
      this.cartProducts = res.data;
      // debugger;
      this.cartProducts.forEach((subTotalItem: any) => {
        this.subTotal = this.subTotal + subTotalItem.productPrice;
      })
    })
  }
}
