import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
import { IndexClienteComponent } from './components/Dashboard/clientes/index-cliente/index-cliente.component';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }