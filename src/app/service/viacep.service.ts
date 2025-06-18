import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EnderecoViaCepDto {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

@Injectable({ providedIn: 'root' })
export class ViacepService {
  private readonly baseUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  buscarEndereco(cep: string): Observable<EnderecoViaCepDto> {
    return this.http.get<EnderecoViaCepDto>(`${this.baseUrl}/${cep}/json`);
  }

  teste(): Observable<string> {
    const body = { email : 'hiroshi@meuemail.com', senha: 'abc' };
    return this.http.post<string>('http://localhost:8080/auth/login', body);
  }

  
}