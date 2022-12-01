import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NewsService {

  //api_key = '386d22c3d33d49cfb492dd369d21cb7e';
  //newsApiUrl = 'https://newsapi.org/v2/top-headlines?country=in&q=electricalsafety&apiKey=386d22c3d33d49cfb492dd369d21cb7e';

  newsApiUrl = "https://newsapi.org/v2/everything?apiKey=386d22c3d33d49cfb492dd369d21cb7e&q=electricity&domain=google.com"
 // params: string = '&inflation&from=YYYY-MM-DD&sortBy=relevancy&apiKey=' //REPLACE YYYY-MM-DD WITH VALID DATE WITHIN ONE MONTH OF RUNNING APP
  
  constructor(private http: HttpClient) { }

//   getNewsServiceByCountry(country: string) {
//     return this.http.get(this.url + country + this.params + this.API_KEY);
//   }

// initSources(){
//     return this.http.get('https://newsapi.org/v2/sources?language=en&apiKey='+this.api_key);
//  }
//  initArticles(){
//   return this.http.get('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey='+this.api_key);
//  }
//  getArticlesByID(source: String){
//   return this.http.get('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+this.api_key);
//  }


topHeadlines():Observable<any> {
    return this.http.get(this.newsApiUrl);
   }
    
  
}