import { Component, OnInit } from '@angular/core';
import { AccountService } from '../_services/account.service';
import Swal from 'sweetalert2';
import { TYPE } from '../_enums/sweet-warnings';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  model: any = {};
  loggedIn: boolean;

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {}

  public login(typeIcon = TYPE.SUCCESS) {
    this.accountService.login(this.model).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public logout(typeIcon = TYPE.WARNING) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-warning',
      },
      buttonsStyling: true,
    });
    swalWithBootstrapButtons
      .fire({
        showCloseButton: true,
        title: 'Tem certeza',
        text: 'Deseja efetuar o logout',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não',
        reverseButtons: false,
      })
      .then((result) => {
        if (result.value) {
          console.log('Fez logout');
          this.accountService.logout();
          return;
        }
        console.log('Cancelout logout, continua logado');
      });
  }
}
