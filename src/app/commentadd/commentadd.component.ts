import { Component, Input } from '@angular/core';
import { CommentService } from '../Service/comment.service';
import { PostComment } from '../modele/PostComment';

@Component({
  selector: 'app-commentadd',
  templateUrl: './commentadd.component.html',
  styleUrls: ['./commentadd.component.css']
})
export class CommentaddComponent {
  Comment: PostComment = new PostComment();
 
  @Input() postId!: number;

  constructor(private forumService: CommentService) {}

  addComment() {
    if (!this.Comment.commentContent) {
      this.alertError();
      return;
    }

    this.forumService.addComment(this.postId, this.Comment).subscribe(
      () => {
        console.log("Commentaire ajouté avec succès");
        this.Comment = new PostComment(); // Réinitialiser le champ de commentaire
        location.reload();
      },
      error => {
        console.error("Erreur lors de l'ajout du commentaire:", error);
        alert("Erreur lors de l'ajout du commentaire");
      }
    );
  }

  alertError() {
    alert('Veuillez saisir un commentaire');
  }
}
