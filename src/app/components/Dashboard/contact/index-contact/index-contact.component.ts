import { Component, OnInit } from '@angular/core';
import { error } from 'console';
import { ContactService } from 'src/app/services/contact.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

declare var $:any;
@Component({
  selector: 'app-index-contact',
  templateUrl: './index-contact.component.html',
  styleUrls: ['./index-contact.component.scss']
})
export class IndexContactComponent implements OnInit {

  public contacts= Array();
  
  public page =1;
  public pageSize = 5;

  public token;
  public load_data = true;

  public filtro = '';
  public noResultados = false;

  constructor(
    private _loginService: LoginService,
    private _contactService: ContactService
  ) { 
    this.token = this._loginService.getToken();
  }

  ngOnInit() {
    this._contactService.get_contact(this.token).subscribe(
      response => {
        console.log(response);
        this.contacts = response;
        this.load_data = false;
      }
      );
    (      error: any) => {
        console.log(error);
      }
    }
  
    cerrar(id: any) {
      // Busca el contacto específico por su ID
      const contact = this.contacts.find((c: any) => c.id === id);
    
      if (contact) {
        // Crea el objeto de datos para enviar al servicio
        const data = {
          customer: contact.customer,
          subject: contact.subject,
          message: contact.message,
          state: 'Cerrado',
          email: contact.email,
          phone: contact.phone,
        };
    
        this._contactService.update_contact(data, id, this.token).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Se ha cerrado el contacto',
              showConfirmButton: false,
              timer: 1500,
            });
    
            // Cierra el modal
            $('#estadoModal-' + id).modal('hide');
            $('.modal-backdrop').removeClass('show');
    
            // Actualiza la vista
            this.ngOnInit();
          },
          (error: any) => {
            console.log(error);
          }
        );
      }
    }
    
}
