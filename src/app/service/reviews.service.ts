import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  HomeReviewsURL = "http://127.0.0.1:8000/api/HomeReviews";
  AddReviewURL = "http://127.0.0.1:8000/api/reviews";
  ShowReviewURL = 'http://127.0.0.1:8000/api/review/';
  headers = new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization':'Bearer '+JSON.parse(localStorage.getItem('token')||'{}')
  })
  constructor(private httpClient:HttpClient) { }

  getAllReviews(){
    return this.httpClient.get(this.HomeReviewsURL);
  }

  addReview(review:any){

    return this.httpClient.post(this.AddReviewURL,review,{headers:this.headers});
  }
  showreviews(id:any){
    return this.httpClient.get(this.ShowReviewURL + id);
  }
}
