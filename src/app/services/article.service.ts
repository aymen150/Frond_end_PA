import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Rep} from './login.service';
import { Book } from '../model/book.model';
import { Article } from '../model/article.model';
import {Graphe} from '../model/graphe.model';
import {Graphe2} from '../model/graphe2.model';
import {async} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  baseUrl = 'http://localhost:5000/company/getArticlesByCompanyOneWeek';
  baseUrlGraph = 'http://localhost:5000/company/getDailyStatsByCompany';
  add_register = false;
  book: [Article];
  graphe: Graphe2;

  constructor(private http: HttpClient, private router: Router) {
  }

   postArticle(id: string) {
    let response;
    const userJson = {'company_id': id};
    response =  this.http.post<Book>(this.baseUrl, userJson, httpOptions).subscribe(
      (status: Book) => {
        this.book = status.result;
        console.log('article récupéré ! ' );
        localStorage.setItem('article', JSON.stringify(status.result));
        localStorage.setItem('id', id);
      },
      (error) => {
        console.log(' article récupéré Erreur ! : ' + error);
      });
     response = this.http.post<Graphe>(this.baseUrlGraph, userJson, httpOptions).subscribe(
       (status: Graphe) => {
         this.graphe =  status.result;
         console.log('graphe récupéré !  json : ' +  JSON.stringify(status.result) );
         localStorage.setItem('graphique3', JSON.stringify(status.result));
       },
       (error) => {
         console.log('graphe récupéré Erreur ! : ' + error);
         localStorage.setItem('graphique2', JSON.stringify( '{\'company_id\' : \'\' ,\'name\' : \'\', \'x\' : \'[]\' , \'y\' : \'[]\'}') );
       });
    console.log('fin méthode post 1');
  }
}
