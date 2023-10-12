import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  public contact: any = {};
  public load_btn = false;

  constructor(private _contactService: ContactService) {}

  ngOnInit(): void {}

  //Metodo para enviar el formulario de contacto
  registro(registroForm: NgForm) {
    if (registroForm.valid) {
      this.load_btn = true;
      this._contactService.create_contact(this.contact).subscribe(
        (response) => {
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Mensaje enviado',
            text: 'Your message was sent successfully!',
          });
          registroForm.reset();
          this.load_btn = false;
        },
        (error) => {
          console.log(<any>error);
        }
      );
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        text: 'All fields are required.',
      });
    }
  }
}
