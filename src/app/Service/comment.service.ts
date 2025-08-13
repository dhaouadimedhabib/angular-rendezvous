import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostComment } from '../modele/PostComment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private baseUrl = 'http://localhost:8084/api/comment'; // URL de base pour l'API
  private apiUrl = 'http://localhost:8084/api/comment/post'; 
  constructor(private http: HttpClient) {}

  // Méthode pour ajouter un commentaire à un post spécifique
  addComment(postId: number, comment: PostComment): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/addComment/${postId}`, comment);
  }
  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this.http.get<PostComment[]>(`${this.apiUrl}/${postId}`);
  }
}
