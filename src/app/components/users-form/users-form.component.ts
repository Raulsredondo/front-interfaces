  
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormGroupDirective, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { ErrorStateMatcher } from '@angular/material/core';
import { AlertService } from 'src/app/services/alert.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  matcher = new MyErrorStateMatcher();

  userForm: FormGroup;
  id = '';
  fullname = '';
  email = '';
  password = '';
  //prodImage = '';
  isLoadingResults = false;
  constructor(private alertService: AlertService,private formBuilder: FormBuilder, private router: Router, private authService: AuthService, private userService: UsersService) { }
  submitted = false;
  ngOnInit() {
    this.userForm = this.formBuilder.group({
      'fullname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.minLength(5)],
      //'prodImage' : [null, Validators.required]
    });
  }

  get f(){
    return this.userForm.controls;
  }


    
  onFormSubmit() {
    this.submitted = true;

  
    if(this.userForm.invalid){
      return;
    }


    this.isLoadingResults = true;
    this.authService.register(this.userForm.value)
      .subscribe(
        res => {
          if(res.length == 0){
            this.alertService.error("Ya existe un usuario con ese email");
            this.isLoadingResults = false;
          }else{
            this.alertService.success('Registro con éxito',true);
            this.router.navigate(['users']);
          }
 
      }, (err) => {
        this.alertService.error(err);
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  back() {
    this.router.navigate(['/users']);
  }
}
