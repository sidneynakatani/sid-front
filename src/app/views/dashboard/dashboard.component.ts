import { CommonModule} from '@angular/common';
import { Component,  OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TableModule } from '@coreui/angular';
import { UsuarioService } from '../../service/usuario.service';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss'],
  imports: [CommonModule, FormsModule,TableModule]
})
export class DashboardComponent implements OnInit {

  usuarios: any[] = [];
  paginaAtual = 0;
  tamanhoPagina = 2;
  totalPaginas = 0;
  totalElementos = 0;
  
  cadastro_liberado = false;

  novoUsuario: any = {
    nome: '',
    email: '',
    senha: '',
    role: 'ROLE_USER', 
    enderecos: [
      {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
      }
    ]
  };

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    const permissao = this.usuarioService.pegaPermissao();
    if(permissao === 'ROLE_ADMIN'){
        this.carregarUsuarios(this.paginaAtual);
        this.cadastro_liberado = true;
    }else{
        this.carregaUsuario();
    }
    
  }
 
carregaUsuario() {
  this.usuarioService.buscarUsuario().subscribe((res) => {
    const usuario = {
      ...res,
      expandido: false
    };
    this.usuarios.push(usuario);
  });
}

  carregarUsuarios(pagina: number) {
    this.usuarioService.buscarUsuarios(pagina, this.tamanhoPagina).subscribe((res) => {
      this.usuarios = res.content.map((usuario: any) => ({
        ...usuario,
        expandido: false // necessário para controle da expansão
      }));
      this.totalPaginas = res.totalPages;
      this.totalElementos = res.totalElements;
      this.paginaAtual = res.number;
    });
  }

  toggle(usuario: any) {
    usuario.expandido = !usuario.expandido;
  }

  salvarEndereco(usuario: any) {
    this.usuarioService.atualizaUsuario(usuario).subscribe({
      next: () => alert('Endereço atualizado com sucesso!'),
      error: (err) => {
        const errorMsg = err?.error?.erro || 'Erro ao atualizar endereço';
        alert(errorMsg)}
    });
  }

  salvarUsuario(usuario: any) {
    this.usuarioService.atualizaUsuario(usuario).subscribe({
        next: () => alert('Usuário atualizado com sucesso!'),
        error: () => alert('Erro ao atualizar usuário')
      });
  }

  mudarPagina(pagina: number) {
    this.carregarUsuarios(pagina);
  }

  cadastrarUsuario() {
  this.usuarioService.criaUsuario(this.novoUsuario).subscribe({
    next: () => {
      alert('Usuário cadastrado com sucesso!');
      this.carregarUsuarios(0);
      this.novoUsuario = {
        nome: '',
        email: '',
        senha: '',
        role: '',
        enderecos: [
          {
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: '',
            cep: ''
          }
        ]
      };
    },
    error: () => {
      alert('Erro ao cadastrar usuário');
    }
  });
}

  adicionarEndereco() {
  this.novoUsuario.enderecos.push({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  });
}

removerEndereco(index: number) {
  this.novoUsuario.enderecos.splice(index, 1);
}

adicionarEnderecoAoUsuario(usuario: any) {
  usuario.enderecos.push({
    logradouro: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: ''
  });
}
 
}
