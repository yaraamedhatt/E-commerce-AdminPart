import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviroments/enviroment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  constructor(private http:HttpClient) { }
  getAllCarts(param?:any){
    let params=new HttpParams()
    return this.http.get(environment.baseApi + 'carts',{params})
  }
  deleteCart(id:number){
    return this.http.delete(environment.baseApi + 'carts/' + id)
  }
}
