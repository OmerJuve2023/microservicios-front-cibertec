import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aplicacion, AplicacionInput } from '../../models/aplicacion.model';

@Injectable({
  providedIn: 'root'
})
export class AplicacionService {
  private readonly API_URL = 'http://localhost:8080/api/aplicaciones/aplicaciones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Aplicacion[]> {
    return this.http.get<Aplicacion[]>(this.API_URL);
  }

  getById(id: string): Observable<Aplicacion> {
    return this.http.get<Aplicacion>(`${this.API_URL}/${id}`);
  }

  create(aplicacion: AplicacionInput): Observable<Aplicacion> {
    return this.http.post<Aplicacion>(this.API_URL, aplicacion);
  }

  update(id: string, aplicacion: AplicacionInput): Observable<Aplicacion> {
    return this.http.put<Aplicacion>(`${this.API_URL}/${id}`, aplicacion);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}