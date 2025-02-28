import { Component ,input,output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-leftsidebar',
  templateUrl: './leftsidebar.component.html',
  styleUrl: './leftsidebar.component.css'
})
export class LeftsidebarComponent {
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();
  items = [
    {
      routeLink: 'home',
      icon: 'fal fa-home',
      label: 'Home',
    },
    {
      routeLink: 'dashboard',
      icon: 'fal fa-chart-line',
      label: 'Dashboard',
    },
    {
      routeLink : 'add-item',
      icon : 'fa fa-plus',
      label:'Add Item'
    },
    {
      routeLink:'list-item',
      icon:'fa fa-table',
      label:'View Items'
    },
    {
      routeLink:'sales',
      icon:'fa fa-store',
      label:'Sales'
    },
    {
      routeLink:'category',
      icon:'fas fa-book',
      label:'Categories'
    },
    {
      routeLink:'suppliers',
      icon:'fas fa-truck',
      label:'Suppliers'
    },
    {
      routeLink: 'logout',
      icon: 'fal fa-sign-out',
      label: 'Logout',
    },
  ];
  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
    }
    
    closeSidenav(): void {
      this.changeIsLeftSidebarCollapsed.emit(true);
      }
}