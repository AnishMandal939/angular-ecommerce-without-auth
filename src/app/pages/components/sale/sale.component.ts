import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.css']
})
export class SaleComponent implements OnInit {
  cartProducts: any[] = [];
  subTotal: number = 0;

  saleObj: any = {
    "SaleId": 0,
    "CustId": 1,
    "SaleDate": new Date(),
    "TotalInvoiceAmount": 0,
    "Discount": 0,
    "PaymentNaration": "NRB",
    "DeliveryAddress1": "near bank",
    "DeliveryAddress2": "somewhere",
    "DeliveryCity": "atm",
    "DeliveryPinCode": "34623",
    "DeliveryLandMark": "atm"
  }
  

  constructor(private productService: ProductService, private router: Router){

  }

  ngOnInit(): void {
    this.loadCart();
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
  removeProductFromCart(id: number){
    this.productService.removeProductFromCartById(id).subscribe((res: any) => {
      if(res.result){
        alert('Product removed from cart');
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }

  makeSale(){
    this.saleObj.TotalInvoiceAmount = this.subTotal;
    this.productService.cartAddedSubject.next(true);
    this.productService.addNewSale(this.saleObj).subscribe((res: any) => {
      if(res.result){
        alert('Sale Created Successfully');
        this.loadCart();
        this.productService.cartAddedSubject.next(true);
      }
    })
  }
}
