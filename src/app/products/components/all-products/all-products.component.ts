import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { OnInit } from '@angular/core';
import { __values } from 'tslib';
import { Product } from '../../models/product';
import { FormBuilder, FormGroup , Validators } from '@angular/forms';


@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  products:Product[]=[]
  categories:string[]=[]
  loading :boolean=false
  cartProducts:any[]=[]
  form!:FormGroup
  base64:any=''
  constructor(private service:ProductsService, private build:FormBuilder){}
  ngOnInit():void{
    this.form=this.build.group({
      title: ['',[Validators.required]],
      price: ['',[Validators.required]],
      description: ['',[Validators.required]],
      image: ['',[Validators.required]],
      category: ['',[Validators.required]]
    })
    this.getProducts()
    this.getCategories()
  }
  getProducts(){
    this.loading=true
    this.service.getAllProducts().subscribe((res:any)=>{
      this.products=res
      this.loading=false
    }, error =>{
      console.log(error.message)
      this.loading=false
    } )
  }
  getCategories(){
    this.loading=true
    this.service.getAllcategories().subscribe((res:any)=>{
      this.categories=res
      this.loading=false
    }, error =>{
      console.log(error.message)
      this.loading=false
    } )
   
  }
  getImagePath(event:any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
       this.base64 = reader.result;
       this.form.get('image')?.setValue('imageval')
       
    };
  }
  createProduct(){
    const model=this.form.value
    this.service.createProduct(model).subscribe((res:any)=>{
      alert("Product added successfully!!!")
    })
  }
  getSelectedCategory(event:any){
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form)
  }
  updateProduct(item:any){

    this.form.patchValue({
      title:item.title,
      price: item.price,
      description:item.description,
      image: item.image,
      category: item.category
    })
    this.base64=item.image
  }
  

}
