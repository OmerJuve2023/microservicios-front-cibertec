import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ClienteAplicacion, ClienteAplicacionInput } from '../../models/cliente-aplicacion.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteAplicacionService {
  private readonly API_URL = 'http://localhost:8080/api/aplicaciones/cliente-aplicacion';

  constructor(private http: HttpClient) {}

  getAll(): Observable<ClienteAplicacion[]> {
    return this.http.get<ClienteAplicacion[]>(this.API_URL);
  }

  getById(id: number): Observable<ClienteAplicacion> {
    return this.http.get<ClienteAplicacion>(`${this.API_URL}/${id}`);
  }

  getByCliente(idCliente: number): Observable<ClienteAplicacion[]> {
    return this.http.get<ClienteAplicacion[]>(`${this.API_URL}/cliente/${idCliente}`);
  }

  getByAplicacion(idAplicacion: string): Observable<ClienteAplicacion[]> {
    return this.http.get<ClienteAplicacion[]>(`${this.API_URL}/aplicacion/${idAplicacion}`);
  }

  create(data: ClienteAplicacionInput): Observable<ClienteAplicacion> {
    return this.http.post<ClienteAplicacion>(this.API_URL, data);
  }

  update(id: number, data: ClienteAplicacionInput): Observable<ClienteAplicacion> {
    return this.http.put<ClienteAplicacion>(`${this.API_URL}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}