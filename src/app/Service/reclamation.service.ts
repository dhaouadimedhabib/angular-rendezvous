import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reclamation } from '../modele/reclamation';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {

  private baseUrl = 'https://springbootrendesvous.onrender.com/api/reclamation';
  private apiUrl = 'https://springbootrendesvous.onrender.com/api/reclamation/all';
  constructor(private http: HttpClient) {}

  addReclamation(reclamation: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(`${this.baseUrl}/add`, reclamation);
  }
  getAllReclamations(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.apiUrl);
  }
}
