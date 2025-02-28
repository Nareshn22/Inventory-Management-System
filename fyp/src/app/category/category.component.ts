import { Component, OnInit } from '@angular/core';
import { Category } from '../models/item';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemserviceService } from '../itemservice.service';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements  OnInit {
  categories!:Category[];
  showAddCategoryForm=false;
  showConfirmModal:boolean=false;
  delid:undefined | number=undefined;
  activeTab:string='list';

  category_form!:FormGroup;

  constructor(
  private http:HttpClient,
  private tsr:ToastrService,
  private router:Router,
  private fb:FormBuilder,
  private service:ItemserviceService

  ){

    this.category_form=this.fb.group({
      name:['',Validators.required],
      description:['',Validators.required]
    });

  }


  ngOnInit(): void {
    this.service.getCategories().subscribe({
      next:(data:any)=>{
        this.categories=data;
      },
      error :err=>{
        console.log(err.error.detail);
        this.tsr.error(err.error.detail);
      }
    })
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }


  toggleAddCategoryForm(){
    this.showAddCategoryForm = !this.showAddCategoryForm;
  };
  addCategory(){
    if(this.category_form.valid){
      let cat=this.category_form.value;
      
      this.http.post("http://localhost:8000/api/inventory/category/new",cat).subscribe({
        next:(data:any)=>{
          this.tsr.success("Category Created!");
          this.category_form.reset();
          this.service.getCategories().subscribe({
            next:data=>{
              this.categories=data;
            }
          })
        },
        error:err=>{
          console.log(err.error.detail);
          this.tsr.error(err.error.detail);
        }
      })
    }
  }

  confirmDelete(category_id:number | undefined){
    this.delid=category_id;
    this.showConfirmModal=true;
  }

  onConfirmDelete(confirm:boolean){
    if(confirm && this.delid !==null){
      this.deleteCategory(this.delid);
    }
    this.showConfirmModal=false;
    this.delid=undefined;
  }

  deleteCategory(cat_id:number | undefined){
      if(cat_id!== undefined){
        this.http.delete(`http://localhost:8000/api/inventory/category/delete/${cat_id}`).subscribe({
          next:()=>{
            this.tsr.success("Category deleted successfully");
            this.service.getCategories().subscribe({
              next:data=>{
                this.categories=data;
              }
            })
          },
          error:err=>{
            this.tsr.error("Error in deleting Category Sorry!");
            console.log(err.error.detail);
          }
        })
      }
  }
}
