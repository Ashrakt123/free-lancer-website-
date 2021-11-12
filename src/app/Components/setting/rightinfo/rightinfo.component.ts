import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { User } from 'src/app/_models/user';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-rightinfo',
  templateUrl: './rightinfo.component.html',
  styleUrls: ['./rightinfo.component.css']
})
export class RightinfoComponent implements OnInit {
  user = new User;
  checkUser:any;
  data:any;
  // photoData:any
  dat:any;
  imageSrc: any;
  form = new FormGroup({
    image: new FormControl(null, [Validators.required]),
  });
  // constructor(private userService:UserService,private router:Router,private route:ActivatedRoute,public fb: FormBuilder)
  files:any;
  submitted=false;
  // form: any;
  constructor(private userService:UserService,private router:Router,private route:ActivatedRoute){}
  ngOnInit(): void {
    this.userService.getUser(this.route.snapshot.params.id).subscribe(res =>{
      this.data = res;
      this.user = this.data;
      this.imageSrc="http://localhost:8000/storage/users/"+this.data.image;
      if(this.user.type=="client"){
        this.checkUser=true;
      }else{
        this.checkUser=false;
      }
    })
    // this.createForm();
    // console.log(this.route.snapshot.params.id);
  }
  get f(){
    return this.form.controls;
  }
  uploadImage(event:any){
    this.files=event.target.files[0]

    var reader  = new FileReader();
    reader.onload = (e)=>  {
      var image = document.createElement("img");
      // the result image data
      this.imageSrc = e.target?.result || "";
   }
   // you have to declare the file loading
   reader.readAsDataURL(this.files);
    console.log(this.files);
  }
  onSubmit(){
    this.submitted=true;
    if (this.form.invalid){
      return;
    }
    const formData = new FormData();
    formData.append("image",this.files, this.files.name)
    this.userService.uploadData(formData,this.user.id).subscribe(res =>{
      // this.user.image = res;
      this.dat = res;
      console.log(this.dat);
    })
    // this.updateUser();
  }
  updateUser(){
    this.onSubmit();
    console.log(this.user);
    // console.log(this.user+this.route.snapshot.params.id);
    this.userService.updateUser(this.route.snapshot.params.id,this.user).subscribe(res =>{
      console.log(this.router.navigate([`/profile/${this.route.snapshot.params.id}`]));
    })
  }
}
