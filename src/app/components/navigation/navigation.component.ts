import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';
import { NavbarService } from '../../services/navbar.service';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

    isLoadingResults = true;
  constructor(public nav: NavbarService, private router: Router) { }

  ngOnInit() {
  }


  logout(){
    sessionStorage.removeItem('token');
    this.router.navigate(['login']);
  }


  

}
