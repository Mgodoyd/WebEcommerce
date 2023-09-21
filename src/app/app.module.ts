import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/Dashboard/sidebar/sidebar.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/Store/login/login.component';
import { FooterComponent } from './components/Store/footer/footer.component';
import { HeaderComponent } from './components/Store/header/header.component';
import { InicioComponent } from './components/Store/inicio/inicio.component';
import { InicioLoginComponent } from './components/Store/inicio-login/inicio-login.component';
import { IndexClienteComponent } from './components/Dashboard/clientes/index-users/index-user.component';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUsersComponent } from './components/Dashboard/clientes/create-users/create-users.component';
import { EditUserComponent } from './components/Dashboard/clientes/edit-user/edit-user.component';
import { ProductComponent } from './components/Dashboard/product/create-products/createproduct.component';
import { IndexProductComponent } from './components/Dashboard/product/index-product/index-product.component';
import { UpdateProductComponent } from './components/Dashboard/product/update-product/update-product.component';
import { InventoryComponent } from './components/Dashboard/product/inventory/inventory.component';
import { CreateCouponComponent } from './components/Dashboard/coupon/create-coupon/create-coupon.component';
import { IndexCouponComponent } from './components/Dashboard/coupon/index-coupon/index-coupon.component';



@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    FooterComponent, 
    HeaderComponent,
    InicioComponent,
    InicioLoginComponent,
    IndexClienteComponent,
    CreateUsersComponent,
    EditUserComponent,
    ProductComponent,
    IndexProductComponent,
    UpdateProductComponent,
    InventoryComponent,
    CreateCouponComponent,
    IndexCouponComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    EditorModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { } 
