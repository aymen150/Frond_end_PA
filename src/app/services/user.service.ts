import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import {Router} from '@angular/router';


const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
};
@Injectable({ providedIn: 'root' })
export class UserService {
  baseUrl = 'http://localhost:5000/user/register';
  add_register = false;

  constructor(private http: HttpClient, private router: Router) {}

  register(model: any): boolean {
    let response;
    const userJson = {'user': model };
    response =  this.http.post(this.baseUrl , userJson, httpOptions).subscribe(
      () => {
        console.log('Enregistrement terminé !');
        this.add_register = true;
        localStorage.setItem('user', JSON.stringify(model));
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('Erreur ! : ' + error);
      });
    console.log('response : ' + response.status);
    return this.add_register;
  }
}
