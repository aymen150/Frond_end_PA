import { Injectable } from '@angular/core';
import { Post } from './post';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  
    searchOption=[]
       public postsData: Post[] 
       postUrl : string = "https://jsonplaceholder.typicode.com/posts";
      constructor(private http: HttpClient) { }
      getPosts(): Observable<Post[]>{
            return this.http.get<Post[]>(this.postUrl);
      }
  }


