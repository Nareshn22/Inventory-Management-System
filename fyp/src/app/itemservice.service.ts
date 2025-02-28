import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemserviceService {

  private baseurl=`http://localhost:8000/api/inventory/`;

  constructor(
    private http:HttpClient,
    private router:Router

  ) {}

  getCategories():Observable<any>{
    return this.http.get(`${this.baseurl}category/list`);
  }
}
