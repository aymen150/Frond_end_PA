import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public user =  new User();
  email = '';
  submitted = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      inputEmail: ['', [Validators.required]],
      inputPassword: ['', [Validators.required]]
    });
  }
  login() {
    this.submitted = true;
    this.user.email = this.loginForm.get('inputEmail').value;
    this.user.password = this.loginForm.get('inputPassword').value;
    this.user.login = this.loginForm.get('inputEmail').value;
    this.loginService.login(this.user);
  }
  ngOnDestroy() {
  }

}
