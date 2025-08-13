import { Component } from '@angular/core';
import { NewsapiservicesServiceService } from '../Service/newsapiservices-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-businessnews',
  templateUrl: './businessnews.component.html',
  styleUrls: ['./businessnews.component.css']
})
export class BusinessnewsComponent {
  searchText!:any;

  constructor(private _services:NewsapiservicesServiceService ,private route: ActivatedRoute) { }
  list!:any;

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 16;
  tableSizes: any = [3, 6, 9, 12]
  businessnewsDisplay:any = [];
  ngOnInit(): void {
    this._services.businessNews().subscribe((result)=>{
      this.businessnewsDisplay = result.articles;
    });
  }
  onTableDataChange(event: any) {
    this.page = event;
    this.ngOnInit();
  }
}
