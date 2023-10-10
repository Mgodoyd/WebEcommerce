import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NouisliderModule } from 'ng2-nouislider';
import { LightgalleryModule } from 'lightgallery/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/Dashboard/sidebar/sidebar.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/Store/login/login.component';
import { FooterComponent } from './components/Store/footer/footer.component';
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
import { UpdateCouponComponent } from './components/Dashboard/coupon/update-coupon/update-coupon.component';
import { ConfigComponent } from './components/Dashboard/config/config/config.component';
import { CreateCategoryComponent } from './components/Dashboard/category/create-category/create-category.component';
import { GaleryProductsComponent } from './components/Dashboard/product/galery-products/galery-products.component';
import { HeaderComponent } from './components/Store/header/header/header.component';
import { ProfileComponent } from './components/Store/User/profile/profile.component';
import { IndexProductStoreComponent } from './components/Store/product/index-product-store/index-product-store.component';
import { ViewProductComponent } from './components/Store/product/view-product/view-product.component';
import { CartComponent } from './components/Store/product/cart/cart.component';
import { AddressComponent } from './components/Store/User/address/address.component';
import { ContactComponent } from './components/Store/contact/contact.component';
import { IndexContactComponent } from './components/Dashboard/contact/index-contact/index-contact.component';
import { IndexOrdersComponent } from './components/Store/User/orders/index-orders/index-orders.component';
import { DetalleOrdersComponent } from './components/Store/User/orders/detalle-orders/detalle-orders.component';
import { IndexSalesComponent } from './components/Dashboard/sales/index-sales/index-sales.component';
import { DetalleSaleComponent } from './components/Dashboard/sales/detalle-sale/detalle-sale.component';
import { InicioComponent } from './components/Dashboard/inicio/inicio.component';
import { UpdatePasswordComponent } from './components/Store/update-password/update-password.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    LoginComponent,
    FooterComponent,
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
    UpdateCouponComponent,
    ConfigComponent,
    CreateCategoryComponent,
    GaleryProductsComponent,
    HeaderComponent,
    ProfileComponent,
    IndexProductStoreComponent,
    ViewProductComponent,
    CartComponent,
    AddressComponent,
    ContactComponent,
    IndexContactComponent,
    IndexOrdersComponent,
    DetalleOrdersComponent,
    IndexSalesComponent,
    DetalleSaleComponent,
    InicioComponent,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    EditorModule,
    NouisliderModule,
    LightgalleryModule,
  ],
  providers: [LoginService],
  bootstrap: [AppComponent],
})
export class AppModule {}
