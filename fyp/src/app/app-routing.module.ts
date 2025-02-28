import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { AddItemComponent } from './add-item/add-item.component';
import { ListItemComponent } from './list-item/list-item.component';
import { CategoryComponent } from './category/category.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SalesComponent } from './sales/sales.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent , canActivate:[AuthGuardService] }, 
  { path: 'login', component: LoginComponent , canActivate:[AuthGuardService]},
  { path: 'signup', component: SignupComponent , canActivate:[AuthGuardService]},
  { path: 'dashboard', component: DashboardComponent ,  canActivate:[AuthGuardService] },
  { path: 'add-item', component: AddItemComponent ,  canActivate:[AuthGuardService] },
  { path: 'list-item', component: ListItemComponent ,  canActivate:[AuthGuardService] },
  { path: 'category', component: CategoryComponent ,  canActivate:[AuthGuardService] },
  { path: 'suppliers', component: SuppliersComponent ,  canActivate:[AuthGuardService] },
  { path: 'logout', component: LogoutComponent },
  { path:'sales', component:SalesComponent , canActivate:[AuthGuardService]},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'**',redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
