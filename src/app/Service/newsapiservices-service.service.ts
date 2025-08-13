import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsapiservicesServiceService {
  constructor(private _http:HttpClient) { }
  //newsapiurl
  newsApiUrl = "https://newsapi.org/v2/everything?q=gaza&apiKey=a462d5e8b8764a51ae0adedd1ac5d882";
  // technewsapiurl
  techApiUrl = "https://newsapi.org/v2/everything?q=appointment%20management%20service%20provider%20(doctor%20OR%20lawyer%20OR%20hairdresser%20OR%20therapist%20OR%20dentist%20OR%20consultant)&apiKey=a462d5e8b8764a51ae0adedd1ac5d882";
  // businessnewsapiurl
  businessApiUrl = "https://newsapi.org/v2/everything?q=medicine&apiKey=a462d5e8b8764a51ae0adedd1ac5d882";

  //topheading()
  topHeading():Observable<any>
  {
    return this._http.get(this.newsApiUrl);
  }

  // technews()
  techNews():Observable<any>
  {
    return this._http.get(this.techApiUrl);
  }
// businssnews()
  businessNews():Observable<any>
  {
    return this._http.get(this.businessApiUrl);
  }
}
