import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  productList: any[] = [];

  // cartobject
  cartObj: any = {
    "CartId": 0,
    "CustId": 1,
    "ProductId": 0,
    "Quantity": 0,
    "AddedDate": "2024-03-13T09:38:37.005Z"
  }

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
    // debugger;
    this.loadAllProducts();
  }

  loadAllProducts() {
    // debugger;
    this.productService.getAllProducts().subscribe((result: any) => {
      this.productList = result.data;
    })
  }

  addItemToCart(productId: number){
    // debugger;
    this.cartObj.ProductId = productId;
    this.productService.addToCart(this.cartObj).subscribe((result: any) => {
      if(result.result){
        alert('Item added to cart');
        this.productService.cartAddedSubject.next(true);
        // this.productList = result.data;
      }
    })
  }

  

}
