import { Component, signal } from '@angular/core';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective, ToastBodyComponent, ToastComponent, ToastHeaderComponent, FormCheckLabelDirective, FormCheckInputDirective, FormCheckComponent } from '@coreui/angular';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../../service/usuario.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  imports: [ContainerComponent,
    RowComponent,
    ColComponent,
    TextColorDirective,
    CardComponent,
    CardBodyComponent,
    FormDirective,
    InputGroupComponent,
    InputGroupTextDirective,
    IconDirective,
    FormControlDirective,
    ButtonDirective,
    FormsModule,
    CommonModule,
    ToastComponent, ToastHeaderComponent, ToastBodyComponent,
    FormCheckComponent, FormCheckInputDirective, FormCheckLabelDirective
  ]
})
export class RegisterComponent {

  constructor(private usuarioService: UsuarioService, private router: Router) {

  }

  mensagensErro: { [campo: string]: string } = {};

  getCamposErro(): string[] {
    return Object.keys(this.mensagensErro);
  }

  
  admin = false;
  visivel = false;
  nome: string = '';
  email: string = '';
  senha: string = '';
  senha_confirmacao: string = '';
  logradouro: string = '';
  numero: string = '';
  complemento: string = '';
  bairro: string = '';
  cidade: string = '';
  estado: string = '';
  cep: string = '';

  criarUsuario() {

    const json = {
      nome: this.nome,
      email: this.email,
      senha: this.senha,
      role: 'ROLE_USER',
      enderecos: [
        {
          logradouro: this.logradouro,
          numero: this.numero,
          complemento: this.complemento,
          bairro: this.bairro,
          cidade: this.cidade,
          estado: this.estado,
          cep: this.cep
        }
      ]
    };

    this.usuarioService.criaUsuario(json).subscribe({
      next: (res) => {
        alert('Usuário cadastrado com sucesso! Você será redirecionado para a tela de login.');
        this.router.navigate(['/login']); 
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 400 && err.error) {
          this.visivel = true;
          this.mensagensErro = err.error;
        }
      }
    });
  }

  aoClicarNaTela() {
    console.log(this.admin)
    this.visivel = false;
  }

}
