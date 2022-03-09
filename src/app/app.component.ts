import { Component } from '@angular/core';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-site-5';


  // mainComponents = ["HOME","LOGIN","BLOG","ABOUTUS"];
  // activeComponent:string = "LOGIN";

  // public showMainComponent(activateComponent:string): void{
  //   for(let comp of this.mainComponents){
  //     if(comp === activateComponent){
  //       this.activeComponent = activateComponent;
  //       return;
  //     }
  //   }
  //   console.log("Unrecognised Component");
  // }

  data:string = "";
  user:User = new User();

  // newBlog = {
  //   title: "",
  //   createdBy: "",
  //   description: "",
  //   height: 0,
  //   action: ""
  // };

  // homeSender(item:string){
  //   if(item === "LOGOUT"){
  //     this.user = new User();
  //     item = "LOGIN";
  //   }
  //   this.data = item;
  //   this.showMainComponent(item);
  // }

  // homeBlog(blog:any){
  //   this.newBlog = blog;
  // }
  
  // loginSender(user:User){
  //   this.user = user;
  // }

}
