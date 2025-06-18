import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { jwtDecode } from 'jwt-decode';

export interface UsuarioDto {
    nome: string;
    email: string;
    senha: string;
    role: string;
    enderecos: EnderecoDto[];
}

export interface EnderecoDto {
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
}

interface JwtPayload {
    sub: string;
    exp: number;
    role?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {

    constructor(private http: HttpClient) { }

    criaUsuario(usuario: UsuarioDto): Observable<any> {
        return this.http.post<string>('http://localhost:8080/api/public/usuario/', usuario);
    }

    login(usuario: string, senha: string): Observable<string> {
        const body = { email: usuario, senha: senha };
        return this.http.post<string>('http://localhost:8080/auth/login', body);
    }

    buscarUsuarios(pagina: number, tamanho: number): Observable<any> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token ?? ''}`
        });

        return this.http.get<any>(
            `http://localhost:8080/api/usuario/todos?page=${pagina}&size=${tamanho}`,
            {
                headers,
            }
        );
    }

    buscarUsuario(): Observable<any> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token ?? ''}`
        });
        const email = this.pegaUsuario();
        return this.http.get<any>(
            `http://localhost:8080/api/usuario/email/${email}`,
            {
                headers,
            }
        );
    }

    atualizaUsuario(usuario: UsuarioDto): Observable<any> {
        const token = localStorage.getItem('token');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${token ?? ''}`
        });
        return this.http.put<string>('http://localhost:8080/api/usuario/', 
            usuario, {headers});
    }

    atualizarEndereco(usuarioId: number, endereco: any): Observable<any> {
        return this.http.put(
            `http://localhost:8080/api/usuarios/${usuarioId}/enderecos/${endereco.id}`,
            endereco
        );
    }

    salvarToken(token: string) {
        localStorage.setItem('token', token);
    }

    obterToken(): string | null {
        return localStorage.getItem('token');
    }

    logout() {
        localStorage.removeItem('token');
    }

    estaLogado(): boolean {
        const token = this.obterToken();
        if (!token) return false;

        try {
            const decoded = jwtDecode<JwtPayload>(token);
            const agora = Math.floor(Date.now() / 1000);
            return decoded.exp > agora;
        } catch (e) {
            console.error('Token inválido', e);
            return false;
        }
    }

    pegaPermissao() : string | null {
        const token = localStorage.getItem('token'); // ou onde você armazena o JWT

        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.role ?? null;;
        }
        return null;
    }

    pegaUsuario() : string | null {
        const token = localStorage.getItem('token'); // ou onde você armazena o JWT

        if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.sub ?? null;;
        }
        return null;
    }
}