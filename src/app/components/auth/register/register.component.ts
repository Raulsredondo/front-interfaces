import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import {NavbarService} from '../../../services/navbar.service';
import { AlertService } from 'src/app/services/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  fullname = '';
  email = '';
  password = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private alertService: AlertService,public nav:NavbarService,private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.nav.hide();
    this.registerForm = this.formBuilder.group({
      'fullname' : [null, Validators.minLength(3)],
      'email' : [null, Validators.required],
      'password' : [null, Validators.minLength(5)]
    });
  }

  onFormSubmit(form: NgForm) {
    this.authService.register(form)
      .subscribe(
        res => {
          if(res.length == 0){
            this.alertService.error("Ya existe un usuario con ese email");
          }else{
            this.alertService.success("Te has registrado con éxito",true);
            this.router.navigate(['login']);
          }
      });
  }

  login() {
    this.router.navigate(['login']);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}