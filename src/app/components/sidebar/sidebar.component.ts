import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {User} from '../../model/user.model';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
   // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
   // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/tables', title: 'Tables',  icon: 'ni-bullet-list-67 text-red', class: '' },
    { path: '/user-profile', title: 'User profile',  icon: 'ni-single-02 text-yellow', class: '' },
    { path: '/login', title: 'Login',  icon: 'ni-key-25 text-info', class: '' },
    { path: '/register', title: 'Register',  icon: 'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  public user: User;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  connecter(item: RouteInfo): boolean {
    if  ((this.user.email !== '') && ((item.title === 'Dashboard') ||
    (item.title === 'User profile') || item.title === 'Tables')) {
      return true;
    } else if  ((this.user.email === '') && ((item.title === 'Register') ||
      (item.title === 'Login') || item.title === 'Tables')) {
      return true;
    } else {
      return false;
    }
  }
}
