import { Component } from '@angular/core';
import { FormBuilder,FormGroup ,Validators} from '@angular/forms';
import { OnInit } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form! : FormGroup;
  
  constructor(
    private formbuilder : FormBuilder,
    private http:HttpClient,
    private router:Router,
    private tsr:ToastrService
  )
  {}

  ngOnInit(): void {
    this.form=this.formbuilder.group({
      name:['',Validators.required],
      email:['',[Validators.email,Validators.required]],
      password:['',Validators.required]
    });
  }

  onSubmit() {
    this.http.post("http://localhost:8000/api/signup",this.form.getRawValue())
    .subscribe({
      next  :  ()=>{ 
        this.router.navigate(['/login'])
        this.tsr.success("Account Created Successfully!!");
      },
      error : error=>{
      this.tsr.error(error.error.detail);
    }
    });
  }
} 
