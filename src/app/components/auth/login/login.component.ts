import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../../auth.service';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import {NavbarService} from '../../../services/navbar.service';
import {HttpClient} from '@angular/common/http'
import {AlertService} from '../../../services/alert.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  email = '';
  password = '';
  matcher = new MyErrorStateMatcher();
  isLoadingResults = false;
  submitted = false;

  constructor(private alertService: AlertService,private http: HttpClient,public nav:NavbarService,private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }
  users: any;
  ngOnInit() {
  
   
    this.nav.hide();
    this.loginForm = this.formBuilder.group({
      'email' : [null, Validators.required],
      'password' : [null, Validators.required]
    });
  }

  onFormSubmit(form: NgForm) {
    this.submitted = true;
    this.authService.login(form)
      .subscribe(
        res => {    
        if (res.token) {
          localStorage.setItem('token', res.token);
         
          this.router.navigate(['proveedores']);
        }else{
          this.alertService.error("Correo/Contraseña erroneos, intente de nuevo.");
        }
     
      },
       (error) => {
        console.log("AAAAAAAAAAAAAAAAAAAA")
        
        console.log('Este es el error'+error);
      });
  }

  register() {
    this.router.navigate(['register']);
  }   

}
