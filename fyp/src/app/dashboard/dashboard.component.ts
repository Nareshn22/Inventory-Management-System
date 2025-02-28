import { Component ,ViewChild} from '@angular/core';
import { OnInit } from '@angular/core';
import { Emitters } from '../Emitters/emitters';
import {Chart} from 'chart.js/auto'
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  authenticated=false;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  inventoryData:any[]=[];
  revenueData:any[]=[];
  constructor(
    private http:HttpClient,
    private tsr:ToastrService,
    private router:Router
  ){}
  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
        console.log(this.authenticated);
      }
    );

    this.http.get('http://localhost:8000/api/user', {withCredentials: true}).subscribe(
      () => {
        Emitters.authEmitter.emit(true);
      },
      err => {
        console.log(err.error);
        Emitters.authEmitter.emit(false);
        this.http.post('http://localhost:8000/api/logout', {}, {withCredentials: true})
      .subscribe(() =>{
        Emitters.authEmitter.emit(false);
        this.authenticated = false;
        this.router.navigate(['/login']);
        });
      }
    );

    this.fetchInventoryData();
    this.fetchRevenueData();
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  fetchInventoryData(){
    this.http.get('http://localhost:8000/api/inventory/item/list').subscribe({
      next: (res: any) => {
        this.inventoryData = res;
        this.renderInventoryChart();
      },
      error: (err) => {
        console.error('Error fetching inventory data:', err);
      }
    });
  }
  fetchRevenueData(){
    this.http.get('http://localhost:8000/api/inventory/transactions').subscribe({
      next: (res: any) => {
        this.revenueData = res;
        this.renderRevenueChart();
      },
      error: (err) => {
        console.error('Error fetching revenue data:', err);
      }
    });
  }
  renderInventoryChart(){
    const canvas = document.getElementById('inventoryChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
  canvas.width = 400 * dpr;  // Set a higher width
  canvas.height = 400 * dpr; // Set a higher height
  ctx?.scale(dpr, dpr);
  new Chart(ctx!, {
    type: 'pie',
    data: {
      labels: this.inventoryData.map(item => item.name),
      datasets: [{
        data: this.inventoryData.map(item => item.quantity),
        backgroundColor: ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f'],
        borderWidth: 2, // Add border for sharper edges
      }]
    },
    options: {
      responsive: false, // Prevent automatic resizing
      maintainAspectRatio: false,
    }
  });
}
  
renderRevenueChart() {
  const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  
  // Fix pixelation
  const dpr = window.devicePixelRatio || 1;
  canvas.width = 600 * dpr;
  canvas.height = 400 * dpr;
  ctx?.scale(dpr, dpr);

  new Chart(ctx!, {
    type: 'bar',
    data: {
      labels: this.revenueData.map(trans => trans.item_name),
      datasets: [{
        label: 'Total Revenue',
        data: this.revenueData.map(trans => trans.total),
        backgroundColor: '#8e44ad',
        borderWidth: 2,
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        }
      }
    }
  });
}

  

}
