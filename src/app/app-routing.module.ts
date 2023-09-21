import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*dashboard*/
import { SidebarComponent } from './components/Dashboard/sidebar/sidebar.component';
    /*users*/
import { IndexClienteComponent } from './components/Dashboard/clientes/index-users/index-user.component';
import { CreateUsersComponent } from './components/Dashboard/clientes/create-users/create-users.component';
import { EditUserComponent } from './components/Dashboard/clientes/edit-user/edit-user.component';
    /*products*/
import { ProductComponent } from './components/Dashboard/product/create-products/createproduct.component';
import { IndexProductComponent } from './components/Dashboard/product/index-product/index-product.component';
import { UpdateProductComponent } from './components/Dashboard/product/update-product/update-product.component';
import { InventoryComponent } from './components/Dashboard/product/inventory/inventory.component';
    /*coupon*/
import { CreateCouponComponent } from './components/Dashboard/coupon/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './components/Dashboard/coupon/index-coupon/index-coupon.component';



/*Guards*/
import { DashGuard } from '../app/guards/dash.guard';


/* Store*/
import { LoginComponent } from './components/Store/login/login.component';
import { InicioComponent}  from './components/Store/inicio/inicio.component';
import { InicioLoginComponent } from './components/Store/inicio-login/inicio-login.component';



const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent},
  { path: 'inicio', component: InicioLoginComponent,/* canActivate: [DashGuard] */},
  { path: 'dashboard', component: SidebarComponent , /*canActivate: [DashGuard]*/},
  { path : 'index',children: [
    { path: 'users', component: IndexClienteComponent, /*canActivate: [DashGuard]  */},
    { path: 'users/create', component: CreateUsersComponent, /*canActivate: [DashGuard]  */},
    { path: 'users/edit/:id', component: EditUserComponent, /*canActivate: [DashGuard]  */},
    { path: 'products', component: IndexProductComponent, /*canActivate: [DashGuard]  */}, 
    { path: 'products/create', component: ProductComponent, /*canActivate: [DashGuard]  */},
    { path: 'products/edit/:id', component: UpdateProductComponent, /*canActivate: [DashGuard]  */},
    { path: 'products/edit/inventary/:id', component: InventoryComponent, /*canActivate: [DashGuard]  */},
    { path: 'coupon', component: IndexCouponComponent, /*canActivate: [DashGuard]  */},
    { path: 'coupon/create', component: CreateCouponComponent, /*canActivate: [DashGuard]  */},  ]}, 
     
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})

export class AppRoutingModule { }
 

