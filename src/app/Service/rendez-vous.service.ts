import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RendezVous } from '../modele/rendezvous';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  private apiUrl = 'https://springbootrendesvous.onrender.com/api/RendezVous';
  private baseUrl = 'https://springbootrendesvous.onrender.com/api/RendezVous/professionnel';
  private Url = 'https://springbootrendesvous.onrender.com/api/RendezVous';
  private apiUri = 'https://springbootrendesvous.onrender.com/api/RendezVous';
  private url = 'https://springbootrendesvous.onrender.com/api/RendezVous';
  constructor(private http: HttpClient) { }


  getHeaders(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      authorization: 'bearer ' + localStorage.getItem('token')
    });
    return headers;
  }

  getAllRendezVous(): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(this.apiUrl).pipe(
      map((data) => {
        if (data) {
          return data;
        } else {
          throw new Error('No data received');
        }
      }),
      catchError((error) => {
        console.error('Error fetching rendez-vous:', error);
        return throwError(() => new Error('Error fetching rendez-vous'));
      })
    );
  }
 
    


  
  getRendezVousByProfessionnelId(professionnelId: number): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.apiUrl}/${professionnelId}`);
   
  }

  ajouterRendezVous(professionnelId: number, rendezVous: any): Observable<number> {
    const url = `${this.Url}/ajouter/${professionnelId}`;
    
    // Spécifier que la réponse attendue est de type `AppointmentResponse`
    return this.http.post<number>(url, rendezVous)
      .pipe(
        catchError(this.handleError)
      );
  }

  
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }

  supprimerRendezVous(id: number): Observable<any> {
    return this.http.delete(`${this.apiUri}/delete/${id}`, { responseType: 'text' });
  }


  updateRendezVous(rendezvous: RendezVous): Observable<RendezVous> {
    return this.http.put<RendezVous>(`${this.url}/update`, rendezvous);
  }

  getRendezVousById(id: number): Observable<RendezVous> {
    return this.http.get<RendezVous>(`${this.url}/${id}`);
  }
 
  getRendezVousByClient(nomClient: string): Observable<RendezVous[]> {
    return this.http.get<RendezVous[]>(`${this.url}/client/${nomClient}`);
  }
}
