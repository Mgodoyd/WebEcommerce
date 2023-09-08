import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
/*dashboard*/
import { SidebarComponent } from './components/Dashboard/sidebar/sidebar.component';
import { IndexClienteComponent } from './components/Dashboard/clientes/index-cliente/index-cliente.component';

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
    { path: 'clientes', component: IndexClienteComponent, /*canActivate: [DashGuard]  */}, ]}, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 