import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  //Get informations from API, based on the selected page
  public getNewsNewYorkTime(page): Observable<any>{
    var urlApi = "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=news_desk:(%22Science%22%20%22Technology%22)&page=" + page + "&api-key=JEv05bTrtl8dtya0Sh1cCaJ1b141NGIo";

    return this.http.get(urlApi);
  }
}
