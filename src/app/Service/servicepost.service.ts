import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../modele/Post';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicepostService {

  constructor(private http: HttpClient) { }


  private baseUrl = 'http://localhost:8084/api/post/posts';
  private BASE_URL_DELETE ='http://localhost:8084/dPost/'
  private BASE_URL_AJOUT ='http://localhost:8000/PI/api/post/addPost'
   private apiUrl ='http://localhost:8084/api/post/user'
    // need to build URL based on category id 
   
  
  getPostList(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }

 
  deletePost(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL_DELETE}/${id}`, { responseType: 'text' });
  
  }
  addPost(Post: Post, id:number): Observable<any> {
    return this.http.post<Post>(`${this.BASE_URL_AJOUT}/${id}` ,Post)
  }
  updatePost(data:any){
    return this.http.put('http://localhost:8084/api/post/updatePost' ,data)
  }
  getOffreById(id :any){
    console.log('gg' , id)
    return this.http.get('http://localhost:8084/api/post/'+id)
  }
  
  getPostsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
