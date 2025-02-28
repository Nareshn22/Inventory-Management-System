import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Emitters } from '../Emitters/emitters';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  authenticated!:boolean;
  sideBarActive:boolean=false;

  constructor(private http: HttpClient,
    private tsr:ToastrService
  ) {
  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      }
    );
  }

  }

