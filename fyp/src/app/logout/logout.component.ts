import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from '../Emitters/emitters';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {
  authenticated:boolean=false;

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  constructor(
    private http:HttpClient,
    private tsr:ToastrService,
    private router:Router
  ){}

  logout(): void {
    this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe(() =>{
        this.tsr.success('Logout Succesfull!');
        Emitters.authEmitter.emit(false);
        this.authenticated = false;
        this.router.navigate(['/login']);
  })
  }

  closeModal(){
    this.router.navigate(['/home']);
  }
  }

