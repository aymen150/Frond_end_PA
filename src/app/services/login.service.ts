import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import {Router} from '@angular/router';

export interface Rep {
  status: string ;
}
const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};
@Injectable({ providedIn: 'root' })
export class LoginService {
  baseUrl = 'http://localhost:5000/user/connect';
  connecte = false;

  constructor(private http: HttpClient, private router: Router) {}

  login(model: any): boolean {
    let response;
    const userJson = {'user': model };
    response =  this.http.post<Rep>(this.baseUrl , userJson, httpOptions).subscribe(
      (status: Rep) => {
        if (status.status === 'success' ) {
          console.log('connection terminé !' );
          this.connecte = true;
          model.password = '';
          localStorage.setItem('user', JSON.stringify( model ));
          this.router.navigate(['/dasboard']);
        }
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      });
    console.log('response : ' + response.status);
    return this.connecte;
  }
}
