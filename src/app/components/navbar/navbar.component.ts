import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public sentence;
  public focus;
  public listTitles: any[];
  public location: Location;
  public user: User;
  //
  constructor(location: Location,  private element: ElementRef, private router: Router) {
    this.location = location;
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.listTitles = ROUTES.filter(listTitle => listTitle);
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if ( titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for ( var item = 0; item < this.listTitles.length; item++) {
        if ( this.listTitles[item] === titlee ) {
            return this.listTitles[item];
        }
    }
    return 'Dashboard';
  }
  connecter(): boolean {
    return (this.user.email !== '');
  }
  //
  logout() {
    this.user.login = '';
    this.user.email = '';
    this.user.password = '';
    localStorage.setItem('user', JSON.stringify( this.user ));
    window.location.reload();
  }

}
