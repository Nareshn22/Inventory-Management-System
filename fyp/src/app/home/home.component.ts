import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OnInit } from '@angular/core';
import { Emitters } from '../Emitters/emitters';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  message = '';

  constructor(
    private http: HttpClient,
    private tsr :ToastrService,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Welcome ${res.name}!`;
        Emitters.authEmitter.emit(true);
      },
      err => {
        console.log(err.error);
        this.message = 'You are not logged in';
        Emitters.authEmitter.emit(false);
        this.tsr.error('Login Required');
        this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
        .subscribe(() =>{
        Emitters.authEmitter.emit(false);
        this.router.navigate(['/login']);
        });


      }
    );
  }
}


