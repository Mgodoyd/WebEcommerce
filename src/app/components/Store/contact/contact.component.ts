import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  public contact : any = {}
  public load_btn = false;

  constructor(
    private _contactService : ContactService
  ) { 
  }

  ngOnInit(): void {
  }

  registro(registroForm: NgForm){
    if(registroForm.valid){
      this.load_btn = true;
      this._contactService.create_contact(this.contact).subscribe(
        response => {
          console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Mensaje enviado',
              text: 'Tu mensaje fue enviado con exito!',
            })
            registroForm.reset();
            this.load_btn = false;
        },
        error => {
          console.log(<any>error);
        }
      )
    
    
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Algo salio mal, verifica los campos!',
    })
  }
  }
}
