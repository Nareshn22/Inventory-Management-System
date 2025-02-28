import { Component, OnInit } from '@angular/core';
import { Item } from '../models/item';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent implements OnInit {
  items:Item[]=[];
  display: boolean = true;
  sortDirection: 'asc' | 'desc' = 'asc'; // Track sorting direction
  sortColumn: string = ''; // Track the column being sorted


  constructor(
    private router:Router,
    private tsr:ToastrService,
    private http:HttpClient

  ){}
  ngOnInit(): void {
    this.http.get("http://localhost:8000/api/inventory/item/list").subscribe({
      next:(res:any)=>{
        this.items=res;
        if(this.items.length==0){
          this.tsr.warning("Inventory is Empty!");
        }
        else{
          this.tsr.success("Items Fetched!");
        }
      },
      error:(err)=>{
        this.tsr.error(err.error.detail);
      }
    });
  }

  sort(column: keyof Item) {
    if (this.sortColumn === column) {
      // Reverse the direction if the same column is clicked again
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      // Set the new column and default to ascending order
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    // Perform sorting
    this.items.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      if (valueA === undefined || valueB === undefined) {
        return 0; // Treat undefined values as equal
      }

      if (column === 'price') {
        valueA = +valueA; // Convert to number
        valueB = +valueB; // Convert to number
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      } else if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
  }

}
