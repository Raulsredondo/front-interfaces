import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import { NavbarService } from 'src/app/services/navbar.service';
import {HttpClient} from '@angular/common/http'
import {User} from '../../models/User';
import {AuthService} from '../../auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private http: HttpClient,public nav: NavbarService,private usersService: UsersService,private authService: AuthService,private router: Router) { }
data: User[] = [];
isLoadingResults = true;
  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers()
      .subscribe(users => {
        this.data = users;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });

  }


  deleteUser(id:string): void {
    this.usersService.deleteUser(id).subscribe(
      data => this.refresh(data))
  }
  refresh(data) {
    console.log('data', data);
    this.usersService.getUsers().subscribe(data => {
      this.data = data;
    });
  }

}
