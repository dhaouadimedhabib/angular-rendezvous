import { Component } from '@angular/core';
import { ServicepostService } from '../Service/servicepost.service';
import { Post } from '../modele/Post';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent {
  post: any;
  searchText!:any;
  posts: Post[]= [];
  prost: Post = new Post();
  constructor(private servicepost: ServicepostService,
    private route: ActivatedRoute) { }

 ngOnInit(): void {
  this.route.paramMap.subscribe(() => {
    this.handlePostDetails();
  })
}
handlePostDetails() {

  // get the "id" param string. convert string to a number using the "+" symbol
  const theProductId: number = +this.route.snapshot.paramMap.get('id')!;

  this.servicepost.getOffreById(theProductId).subscribe(
    data => {
      this.post = data;
    }
  )
}
listPosts() {
    
  this.servicepost.getPostList().subscribe(
    data => {
      this.posts = data;
      console.log(data);
    }
  )
  
}
}
