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
import { GaleryProductsComponent } from './components/Dashboard/product/galery-products/galery-products.component';
    /*coupon*/
import { CreateCouponComponent } from './components/Dashboard/coupon/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './components/Dashboard/coupon/index-coupon/index-coupon.component';
import { UpdateCouponComponent } from './components/Dashboard/coupon/update-coupon/update-coupon.component';
    /*Config */
import { ConfigComponent } from './components/Dashboard/config/config/config.component';
    /*Category */
import { CreateCategoryComponent } from './components/Dashboard/category/create-category/create-category.component';

/*Guards*/
import { DashGuard } from '../app/guards/dash.guard';


/* Store*/
import { LoginComponent } from './components/Store/login/login.component';
import { InicioLoginComponent } from './components/Store/inicio-login/inicio-login.component';

  /*Profile */
import { ProfileComponent } from './components/Store/User/profile/profile.component';

  /*Products*/
import { IndexProductStoreComponent } from './components/Store/product/index-product-store/index-product-store.component'; 
import { ViewProductComponent } from './components/Store/product/view-product/view-product.component'; 

  /*Cart*/
import { CartComponent } from './components/Store/product/cart/cart.component';




const routes: Routes = [
  
  { path: '', component: InicioLoginComponent,/* canActivate: [DashGuard] */},
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: SidebarComponent , /*canActivate: [DashGuard]*/},
  { path : 'index',children: [
    { path: 'users', component: IndexClienteComponent, /*canActivate: [DashGuard]  */},
    { path: 'users/create', component: CreateUsersComponent, /*canActivate: [DashGuard]  */},
    { path: 'users/edit/:id', component: EditUserComponent, /*canActivate: [DashGuard]  */},
    { path: 'products', component: IndexProductComponent, /*canActivate: [DashGuard]  */}, 
    { path: 'products/create', component: ProductComponent, /*canActivate: [DashGuard]  */},
    { path: 'products/edit/:id', component: UpdateProductComponent, /*canActivate: [DashGuard]  */},
    { path: 'products/edit/inventary/:id', component: InventoryComponent, /*canActivate: [DashGuard]  */},
    { path: 'products/galery/:id', component: GaleryProductsComponent, /*canActivate: [DashGuard]  */},
    { path: 'coupon', component: IndexCouponComponent, /*canActivate: [DashGuard]  */},
    { path: 'coupon/create', component: CreateCouponComponent, /*canActivate: [DashGuard]  */}, 
    { path: 'coupon/edit/:id', component: UpdateCouponComponent, /*canActivate: [DashGuard]  */}, 
    { path: 'config', component: ConfigComponent, /*canActivate: [DashGuard]  */}, 
  ]},
  { path: 'category', component: CreateCategoryComponent, /*canActivate: [DashGuard]  */}, 
  { path: 'profile', component: ProfileComponent, canActivate: [DashGuard]  },
  {path: 'products/store', component: IndexProductStoreComponent  },
  {path: 'products/store/category/:category', component: IndexProductStoreComponent  },
  {path: 'products/store/view/:id', component: ViewProductComponent  },
  {path: 'cart', component: CartComponent,  canActivate: [DashGuard]  },
  {path: '**', redirectTo: '', pathMatch: 'full' } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})

export class AppRoutingModule { }
 

