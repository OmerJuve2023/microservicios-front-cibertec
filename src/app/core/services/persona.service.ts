import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona, PersonaInput } from '../../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private readonly API_URL = 'http://localhost:8080/api/usuarios/personas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.API_URL);
  }

  getById(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.API_URL}/${id}`);
  }

  create(persona: PersonaInput): Observable<Persona> {
    return this.http.post<Persona>(this.API_URL, persona);
  }

  update(id: number, persona: PersonaInput): Observable<Persona> {
    return this.http.put<Persona>(`${this.API_URL}/${id}`, persona);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}