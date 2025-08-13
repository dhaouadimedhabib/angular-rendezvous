import { Component, OnInit } from '@angular/core';
import { Post } from '../modele/Post';
import { ServicepostService } from '../Service/servicepost.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  currentCategoryId: number=1;  
  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];
  constructor(private postService: ServicepostService,
    private route: ActivatedRoute,
  ) { }

  list!:any;
searchText!:any;
  ngOnInit() {
    this.listPosts();
  }

  listPosts() {
    
    this.postService.getPostList().subscribe(
      data => {
        this.posts = data;
        console.log(data);
      }
    )
    
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}