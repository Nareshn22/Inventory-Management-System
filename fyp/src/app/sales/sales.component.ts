// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Item } from '../models/item';

// @Component({
//   selector: 'app-sales',
//   templateUrl: './sales.component.html',
//   styleUrl: './sales.component.css'
// })
// export class SalesComponent implements OnInit{
//   items!:Item[];
//   filteredItems!:Item[];
//   currentTab: string = 'sell';
//   sellForm!:FormGroup;

//   transactions!:any[];

//   ngOnInit(): void {
//     this.http.get("http://localhost:8000/api/inventory/item/list").subscribe({
//       next:(res:any)=>{
//         this.items=res;
//         this.filteredItems=[...this.items];
//       },
//       error:(err:any)=>{
//         this.tsr.error(err.error.detail);
//       }
//     });

//     this.sellForm=this.fb.group({
//       item:['',Validators.required],
//       availableQuantity: [{ value: '', disabled: true }], // Readonly
//       pricePerUnit: [{ value: '', disabled: true }], // Readonly
//       quantity: ['', [Validators.required, Validators.min(1)]], // User input for quantity
//       customerName: ['', Validators.required] // Customer name
//     })

//     this.http.get("http://localhost:8000/api/inventory/transactions").subscribe({
//       next:(res:any)=>{
//         this.tsr.success("Transactions Fetched");
//         this.transactions=res;
//       },
//       error:(err:any)=>{
//         this.tsr.error("Error in fetching transactions please try again");
//       }
//     });

    
//   }

//   constructor(
//     private http:HttpClient,
//     private router:Router,
//     private tsr:ToastrService,
//     private fb:FormBuilder
//   ){}

//   setTab(tab:string ){
//     this.currentTab = tab;
//   }

//   filterItems(event:any){
//     const searchValue = this.sellForm.get('item')?.value.toLowerCase();
//     this.filteredItems = this.items.filter((item) =>
//       item.name.toLowerCase().includes(searchValue)
//     );

//     // Automatically populate fields if a full match occurs
//     const selectedItem = this.items.find(
//       (item) => item.name.toLowerCase() === searchValue
//     );
//     if (selectedItem) {
//       this.updateFields(selectedItem);
//     } else {
//       this.clearFields(); // Clear dependent fields if no match
//     }
//   }
  

//   updateFields(selectedItem: any): void {
//     this.sellForm.patchValue({
//       availableQuantity: selectedItem.quantity,
//       pricePerUnit: selectedItem.price
//     });
//   }

//   clearFields(): void {
//     this.sellForm.patchValue({
//       availableQuantity: '',
//       pricePerUnit: ''
//     });
//   }
//   sellItem(){

//     if (this.sellForm.invalid) {
//       console.error('Form is invalid');
//       return;
//     }
//     const {item,quantity,customerName}=this.sellForm.value;
//     const selectedItem =this.items.find(i=>i.name.toLowerCase()===item.toLowerCase());
//     if (!selectedItem) {
//       console.error('Item not found');
//       return;
//     }

//     if(quantity > selectedItem.quantity){
//       alert("Insufficient Stocks!!");
//       return;
//     }

//     this.http.patch(`http://localhost:8000/api/inventory/item/update/${selectedItem.id}`,{
//       'quantity_sold':quantity
//     }).subscribe({
//       next:(res:any)=>{
//         this.tsr.success("Item Sold Succesfully!");
//         this.sellForm.reset();

//         this.http.get("http://localhost:8000/api/inventory/item/list").subscribe({
//           next:(res:any)=>{
//             this.items=res;
//             const transactionData={
//               customer_name:customerName,
//               item_name:selectedItem.name,
//               quantity:quantity,
//               price:selectedItem.price,
//               total:(quantity*selectedItem.price),
//             }
//             this.http.post("http://localhost:8000/api/inventory/transactions",transactionData).subscribe({
//               next:(res:any)=>{
//                 this.tsr.success("Transaction Updated!");
//               },
//               error : (err:any)=>{
//                 this.tsr.error(err.error.detail);
//               }
//             });


//             this.http.get("http://localhost:8000/api/inventory/transactions").subscribe({
//               next:(res:any)=>{
//                 this.transactions=res;
//               }
//             });
//           },
//           error:(err:any)=>{
//             this.tsr.error(err.error.detail);
//           }
//         });
//       },
//       error:(err:any)=>{
//         this.tsr.error("Error "+err.error.detail);
//       }
//     });

//   }
// }

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Item } from '../models/item';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit {
  items!: Item[];
  filteredItems!: Item[];
  currentTab: string = 'sell';
  sellForm!: FormGroup;
  transactions!: any[];

  constructor(
    private http: HttpClient,
    private router: Router,
    private tsr: ToastrService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.fetchItems();
    this.fetchTransactions();

    this.sellForm = this.fb.group({
      item: ['', Validators.required],
      availableQuantity: [{ value: '', disabled: true }], // Readonly
      pricePerUnit: [{ value: '', disabled: true }], // Readonly
      quantity: ['', [Validators.required, Validators.min(1)]], // User input for quantity
      customerName: ['', Validators.required] // Customer name
    });
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  filterItems(event: any) {
    const searchValue = this.sellForm.get('item')?.value.toLowerCase();
    this.filteredItems = this.items.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );

    const selectedItem = this.items.find(
      (item) => item.name.toLowerCase() === searchValue
    );

    if (selectedItem) {
      this.updateFields(selectedItem);
    } else {
      this.clearFields();
    }
  }

  updateFields(selectedItem: any): void {
    this.sellForm.patchValue({
      availableQuantity: selectedItem.quantity,
      pricePerUnit: selectedItem.price
    });
  }

  clearFields(): void {
    this.sellForm.patchValue({
      availableQuantity: '',
      pricePerUnit: ''
    });
  }

  fetchItems(): void {
    this.http.get<Item[]>("http://localhost:8000/api/inventory/item/list").subscribe({
      next: (res: Item[]) => {
        this.items = res;
        this.filteredItems = [...this.items];
      },
      error: (err: any) => {
        this.tsr.error(err.error.detail);
      }
    });
  }

  fetchTransactions(): void {
    this.http.get<any[]>("http://localhost:8000/api/inventory/transactions").subscribe({
      next: (res: any[]) => {
        this.transactions = res;
      },
      error: (err: any) => {
        this.tsr.error("Error in fetching transactions, please try again");
      }
    });
  }

  sellItem(): void {
    if (this.sellForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const { item, quantity, customerName } = this.sellForm.value;
    const selectedItem = this.items.find(i => i.name.toLowerCase() === item.toLowerCase());

    if (!selectedItem) {
      console.error('Item not found');
      return;
    }

    if (quantity > selectedItem.quantity) {
      alert("Insufficient Stocks!!");
      return;
    }

    const transactionData = {
      customer_name: customerName,
      item_name: selectedItem.name,
      quantity: quantity,
      price: selectedItem.price,
      total: quantity * selectedItem.price,
    };

    // **Using `switchMap` to Avoid Nested Calls**
    this.http.patch(`http://localhost:8000/api/inventory/item/update/${selectedItem.id}`, {
      'quantity_sold': quantity
    }).pipe(
      switchMap(() => {
        this.tsr.success("Item Sold Successfully!");
        return this.http.post("http://localhost:8000/api/inventory/transactions", transactionData);
      }),
      switchMap(() => {
        this.tsr.success("Transaction Updated!");
        return this.http.get("http://localhost:8000/api/inventory/item/list");
      })
    ).subscribe({
      next: (res: any) => {
        this.items = res;
        this.fetchTransactions();  // **Update transactions list after a new sale**
        this.sellForm.reset();
      },
      error: (err: any) => {
        this.tsr.error("Error: " + err.error.detail);
      }
    });
  }
}
