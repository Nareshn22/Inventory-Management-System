import { Component, OnInit } from '@angular/core';
import { Supplier } from '../models/item';
import { FormBuilder,Validators,FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.css'
})
export class SuppliersComponent implements OnInit {

  showAddSupplierForm:boolean=false;
  currentTab:string='list';
  suppliers!:Supplier[];
  supplier_form!:FormGroup;
  constructor(

    private http:HttpClient,
    private formbuilder:FormBuilder,
    private tsr:ToastrService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.supplier_form=this.formbuilder.group({
      name:['',Validators.required],
      company_name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      phn_no:['',[Validators.required,Validators.maxLength(10)]],
      address:['',Validators.required],
    })


    this.http.get("http://localhost:8000/api/inventory/supplier/list").subscribe({
      next :(data:any)=>{
        this.suppliers=data;
      },
      error:err=>{
        this.tsr.error(err.error.detail);
      }
    })
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }
  
  toggleAddSupplierForm(){
    this.showAddSupplierForm=!this.showAddSupplierForm;
  }

  addSupplier(){
    this.http.post('http://localhost:8000/api/inventory/supplier/new',this.supplier_form.getRawValue()).subscribe({
      next:res=>{
        this.tsr.success("Supplier Added");
        this.supplier_form.reset();
        this.router.navigate(['/suppliers']);
      },
      error:err=>{
        this.tsr.error(err.error.detail);
      }
    })

  }
}
