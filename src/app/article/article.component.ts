import { Component, OnInit } from '@angular/core';
import { ServicepostService } from '../Service/servicepost.service';
import { Post } from '../modele/Post';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  list: Post[] = [];  // Liste des posts
  tableSize: number = 10; // Nombre d'éléments par page
  page: number = 1; // Page actuelle
  count: number = 0; // Nombre total d'éléments pour la pagination

  constructor(private postService: ServicepostService) {}

  ngOnInit(): void {
    const userId = Number(localStorage.getItem('userId')); // Récupère l'ID de l'utilisateur du localStorage
    if (userId) {
      this.getPosts(userId);  // Appelle la méthode pour obtenir les posts de l'utilisateur
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  getPosts(userId: number): void {
    this.postService.getPostsByUserId(userId).subscribe(
      (data) => {
        this.list = data;  // Stocke les données dans la variable locale
      },
      (error) => {
        console.error('Erreur lors de la récupération des publications', error);
      }
    );
  }

  // Méthode pour supprimer un post
  deletepost(postId: number): void {
    this.postService.deletePost(postId).subscribe(() => {
      this.list = this.list.filter(post => post.postId !== postId); // Supprime le post de la liste locale sans rechargement
    });
  }

  // Méthodes pour trier les posts
  filterD(): void {
    this.list.sort((a, b) => a.title.localeCompare(b.title)); // Tri ascendant par titre
  }

  filterA(): void {
    this.list.sort((a, b) => b.title.localeCompare(a.title)); // Tri descendant par titre
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}
