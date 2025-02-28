import { Component, OnInit } from '@angular/core';
import { Form,FormBuilder,FormGroup,ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import { Item,Supplier,Category } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.css'
})
export class AddItemComponent implements OnInit {
  itemForm!:FormGroup;
  suppliers!:Supplier[];
  categories!:Category[];

  ngOnInit(): void {

    this.http.get("http://localhost:8000/api/inventory/category/list").subscribe({
      next:(data:any)=>{
        this.categories=data;
      },
      error:err=>{
        console.log(err.error.detail);
      }
    })

    this.http.get("http://localhost:8000/api/inventory/supplier/list").subscribe({
      next:(data:any)=>{
        this.suppliers=data;
      }
    })
    
    this.itemForm=this.formbuilder.group({
      name : ['',[Validators.required,Validators.maxLength(50)]],
      description : ['',Validators.required],
      category:[NaN,Validators.required],
      supplier:[NaN,Validators.required],
      quantity:[0,[Validators.required,Validators.min(1)]],
      price:[0,[Validators.required , Validators.min(0.01)]],
    })
  }

  constructor(
    private http:HttpClient,
    private tsr:ToastrService,
    private formbuilder:FormBuilder,
    private router:Router
  ){}

  onSubmit(){
    const itemData = {
      name: this.itemForm.value.name,
      description: this.itemForm.value.description,
      categoryId: Number(this.itemForm.value.category), 
      supplierId: Number(this.itemForm.value.supplier), 
      quantity: this.itemForm.value.quantity,
      price: this.itemForm.value.price
    };
    if(this.itemForm.valid){
      this.http.post("http://localhost:8000/api/inventory/item/new",itemData).subscribe({
        next:(res:any)=>{
          this.tsr.success("Item Added Successfully");
          this.itemForm.reset();
        },
        error:(err)=>{
          this.tsr.error(err.error.error);
        }

      });
    }
    console.log(this.itemForm.value);
  }
}
