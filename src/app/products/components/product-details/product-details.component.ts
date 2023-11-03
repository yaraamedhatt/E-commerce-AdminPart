import { Component, OnInit  } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit  {
  loading:boolean=false
  id:any
  data:any={}
  constructor(private service:ProductsService ,private route:ActivatedRoute){
    this.id=this.route.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    this.getProduct()
  }
  getProduct(){
    this.loading=true
    this.service.getProductById(this.id).subscribe(res => {
      this.loading=false
      this.data=res
    },error => {
      this.loading=false
      alert(error)
    })
  }

}
