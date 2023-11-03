import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartsService } from '../../services/carts.service';
import {ProductsService} from '../../../products/services/products.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private service:CartsService ,private build:FormBuilder , private productservice:ProductsService) {
    
   
  }
  carts:any[] = [];
  products:any[] = [];
  form!:FormGroup
  details:any;
  ngOnInit(): void {
    this.form=this.build.group({
      start:[''],
      end:['']
    })
   this.getAllCarts()
  }
  getAllCarts(){
    this.service.getAllCarts().subscribe((res:any) => {
      this.carts = res
    })
  }
  applyFilter(){
    let date=this.form.value
    this.service.getAllCarts(date).subscribe((res:any)=>{
      this.carts=res
    })
   
  }
  deleteCart(id:number){
    this.service.deleteCart(id).subscribe((res:any)=>{
      this.applyFilter()
      alert("item successfully deleted")
    })
  }
  view(index:number){
    this.products=[]
    this.details=this.carts[index]
    for(let x in this.details.products){
      this.productservice.getProductById(this.details.products[x].productId).subscribe(res => {
        this.products.push({item: res , quantity: this.details.products[x].quantity})
      })
    }
    console.log(this.details)
   
  }


  


 
 
  
}