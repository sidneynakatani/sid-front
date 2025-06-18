import { Component } from '@angular/core';
import { NgStyle } from '@angular/common';
import { IconDirective } from '@coreui/icons-angular';
import { ContainerComponent, RowComponent, ColComponent, CardGroupComponent, TextColorDirective, CardComponent, CardBodyComponent, FormDirective, InputGroupComponent, InputGroupTextDirective, FormControlDirective, ButtonDirective } from '@coreui/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../../service/usuario.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ContainerComponent, 
      RowComponent, 
      ColComponent, 
      CardGroupComponent, 
      TextColorDirective, 
      CardComponent, 
      CardBodyComponent, 
      FormDirective, 
      InputGroupComponent, 
      InputGroupTextDirective, 
      IconDirective, FormControlDirective, 
      ButtonDirective, NgStyle, FormsModule]
})
export class LoginComponent {

  constructor(private router: Router, private usuarioService: UsuarioService) {}

  email: string = '';
  senha: string = '';

  register() {
    this.router.navigate(['/register']);
  }

   login(){
      this.usuarioService.login(this.email, this.senha).subscribe({
      next: (res: any) => {
      this.usuarioService.salvarToken(res.token);
      this.router.navigate(['/dashboard']);
    },
    error: () => {
      alert('Login inválido');
    }
  });
   }
}
