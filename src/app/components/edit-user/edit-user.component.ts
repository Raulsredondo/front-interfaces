import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/User';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/models/Photo';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  SERVER_URL = "http://localhost:8082/api/photos/add";
  uploadForm: FormGroup;
  userForm: FormGroup;
  id = '';
  fullname = '';
  email = '';
  password = '';
data;
base64;
  photo: Photo = {
    id: 0,
    title: "",
    image: ''
  };
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
reader = new FileReader();
  form: FormGroup;
  imagepath = '';
  constructor(private photoService:PhotoService,private http: HttpClient,private domSanitizer: DomSanitizer,private formBuilder: FormBuilder, private router: Router , private route: ActivatedRoute, private authService: AuthService, private userService: UsersService) { }
 
 
  ngOnInit() {
    this.form = this.formBuilder.group({
      name:[''],
      avatar:null
    });
    this.getUser(this.route.snapshot.params.id);
    this.userForm = this.formBuilder.group({
      'fullname' : [null, Validators.required],
      'email' : [null, Validators.required],
      'password' : [null, Validators.required],
    });
 
   this.getPhoto(this.route.snapshot.params.id);

  }

transform(){
  return this.domSanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,'+this.imagepath)
}
onFileChange(event){

    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      console.log("file")
      this.photo.title = file.name
      console.log("file"+file.name)
      console.log("image"+JSON.stringify(file))
      //reader.readAsDataURL(file);
      this.reader.onload = () => {
       // this.photo.image = this.reader.result.split(',')[1]
        this.photo.id = this.route.snapshot.params.id;
        }
        this.reader.onloadend = () => {
          this.photoService.addPhoto(this.photo).subscribe(
            (res) => console.log(res),
            (err) => console.log(err))
            this.getPhoto(this.route.snapshot.params.id);
            console.log(this.getPhoto(this.route.snapshot.params.id))
        }
       this.reader.readAsDataURL(file);
       event.srcElement.value = null;

      }
      
     
        
        
    
  
}

deletePhoto(): void {
  this.photoService.deletePhoto(this.route.snapshot.params.id).subscribe(
    data => this.refresh(data)
  )
  this.borrarFoto();
  this.transform();
  
}

mostrarFoto(){
  this.base64='data:image/png;base64,'+this.imagepath;
}
borrarFoto(){
  this.imagepath = '';
}
  getUser(id: any) {
    this.userService.getUser(id).subscribe((data: any) => {
      this.id = data.id;
      this.userForm.setValue({
        fullname: data.fullname,
        email: data.email,
        password: data.password,
      });
    });
  }
  getPhoto(id: any) {
    this.photoService.getPhoto(id).subscribe((data: any) => {
    this.imagepath = data.image;
 
   console.log(this.imagepath)
 
    });
    
  }

  onFormSubmit() { 
 
    this.isLoadingResults = true;
    this.userService.updateUser(this.id, this.userForm.value)
      .subscribe((res: any) => {
          this.isLoadingResults = false;
          this.router.navigate(['/users']);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  back() {
    this.router.navigate(['/users']);
  }

  refresh(data) {
    console.log('data', data);
    this.photoService.getPhoto(this.route.snapshot.params.id).subscribe(data => {
      this.data = data;
    });
  }
}
