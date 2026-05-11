import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente, ClienteInput } from '../../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private readonly API_URL = 'http://localhost:8080/api/clientes/clientes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.API_URL);
  }

  getById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.API_URL}/${id}`);
  }

  create(cliente: ClienteInput): Observable<Cliente> {
    return this.http.post<Cliente>(this.API_URL, cliente);
  }

  update(id: number, cliente: ClienteInput): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.API_URL}/${id}`, cliente);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}