import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Menu, MenuInput } from '../../models/menu.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private readonly API_URL = 'http://localhost:8080/api/menus/menus';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.API_URL);
  }

  getById(id: string): Observable<Menu> {
    return this.http.get<Menu>(`${this.API_URL}/${id}`);
  }

  getByAplicacion(idAplicacion: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API_URL}/aplicacion/${idAplicacion}`);
  }

  getByPadre(idMenuPadre: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API_URL}/padre/${idMenuPadre}`);
  }

  getByNivel(nivel: string): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.API_URL}/nivel/${nivel}`);
  }

  create(menu: MenuInput): Observable<Menu> {
    return this.http.post<Menu>(this.API_URL, menu);
  }

  update(id: string, menu: MenuInput): Observable<Menu> {
    return this.http.put<Menu>(`${this.API_URL}/${id}`, menu);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}