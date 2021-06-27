import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../model/user.model';
import {UserService} from '../../services/user.service';
import {waitForAsync} from '@angular/core/testing';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public user =  new User();
  email = '';
  submitted = false;
  RegisterForm: FormGroup;
  test;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.RegisterForm = this.fb.group({
      inputEmail: ['', [Validators.required]],
      inputPassword: ['', [Validators.required]],
      inputName: ['', [Validators.required]],
      inputFirstName: ['', [Validators.required]],
      inputUserName: ['', [Validators.required]],
      inputDate:  ['', [Validators.required]],
      inputJob: ['', [Validators.required]],
      inputSchool: ['', [Validators.required]],
      inputDiplome: ['', [Validators.required]],
      inputAdress: ['', [Validators.required]],
      inputAdress2: [''],
      inputCity: ['', [Validators.required]],
      inputCodePostal:  ['', [Validators.required]],
      inputState: ['', [Validators.required]]
    });
  }
  //
  public handleError = (controlName: string) => {
    return this.RegisterForm.controls[controlName].hasError('required');
  }

  register() {
    this.submitted = true;
    if (this.RegisterForm.valid) {
      this.user.email = this.RegisterForm.get('inputEmail').value;
      this.user.password = this.RegisterForm.get('inputPassword').value;
      this.user.login = this.RegisterForm.get('inputEmail').value;
      this.userService.register(this.user);
    }
  }

}
