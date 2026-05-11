import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccesoMenu, AccesoMenuInput } from '../../models/acceso-menu.model';

@Injectable({
  providedIn: 'root'
})
export class AccesoMenuService {
  private readonly API_URL = 'http://localhost:8080/api/usuarios/accesos-menus';

  constructor(private http: HttpClient) {}

  getAll(): Observable<AccesoMenu[]> {
    return this.http.get<AccesoMenu[]>(this.API_URL);
  }

  getById(id: number): Observable<AccesoMenu> {
    return this.http.get<AccesoMenu>(`${this.API_URL}/${id}`);
  }

  getByUsuario(idUsuario: number): Observable<AccesoMenu[]> {
    return this.http.get<AccesoMenu[]>(`${this.API_URL}/usuario/${idUsuario}`);
  }

  create(accesoMenu: AccesoMenuInput): Observable<AccesoMenu> {
    return this.http.post<AccesoMenu>(this.API_URL, accesoMenu);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}