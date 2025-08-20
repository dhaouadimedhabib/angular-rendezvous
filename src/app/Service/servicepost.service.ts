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


  private baseUrl = 'https://springbootrendesvous.onrender.com/api/post/posts';
  private BASE_URL_DELETE ='https://springbootrendesvous.onrender.com/dPost/'
  private BASE_URL_AJOUT ='https://springbootrendesvous.onrender.com/PI/api/post/addPost'
   private apiUrl ='https://springbootrendesvous.onrender.com/api/post/user'
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
    return this.http.put('https://springbootrendesvous.onrender.com/api/post/updatePost' ,data)
  }
  getOffreById(id :any){
    console.log('gg' , id)
    return this.http.get('https://springbootrendesvous.onrender.com/api/post/'+id)
  }
  
  getPostsByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${userId}`);
  }
}
