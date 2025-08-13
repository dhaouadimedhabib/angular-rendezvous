import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { PostComment } from '../modele/PostComment';
import { CommentService } from '../Service/comment.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit, OnChanges {

  @Input() postId!: number;
  comments!: PostComment[];
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 1;
  tableSizes: any = [3, 6, 9, 12];

  list:any;
  constructor(private service: CommentService) { }

  ngOnInit(): void {
    // Initialisation des commentaires seulement si postId est déjà défini
    if (this.postId) {
      this.fetchComments();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Si postId change, rechargez les commentaires
    if (changes['postId'] && changes['postId'].currentValue) {
      this.fetchComments();
    }
  }

  fetchComments(): void {
    this.service.getCommentsByPostId(this.postId).subscribe(
      (comments) => {
        this.comments = comments;
        console.log('Fetched comments:', comments);
      },
      (error) => {
        console.error('Error fetching comments:', error);
      }
    );
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}
