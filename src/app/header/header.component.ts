import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditBlogComponent } from '../blogs/edit-blog/edit-blog.component';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  public user:User=new User();
  public bullet:string = "\u2022";
  public activeItem:string = "LOGIN";

  // @Input('user') set setUser(user:User){
  //   this.user=user;
  //   if(user.getUsername().length>0){
  //     this.itemSelected("BLOG");
  //   }
  // }

  // @Output()  headercomp:EventEmitter<string> = new EventEmitter<string>();

  constructor(
    // private dialog: MatDialog
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
    ) {
      this.userService.userEmitter.subscribe( user => {
        this.user = user;
      });
     }

     public logout(){
       this.userService.setLoggedInUser(new User());
       this.router.navigate(['/login']);
     }

     public isAdmin(){

      if( this.user !== undefined && this.user.getUsername().length>0 && this.user.getRole() === 'ADMIN'){
        return true; 
      }

       return false;
     }


  openDialog(): void {

    const dialogRef = this.dialog.open(EditBlogComponent, {data: {blog:new Blog(undefined), index: -1, user:this.user}});
    dialogRef.afterClosed().subscribe(result => {});
  }

  // itemSelected(item:string){
  //   this.activeItem = item;
  //   // debugger
  //   if(item === "CREATEBLOG"){
  //     item = "BLOG";
  //     // this.openDialog();
  //     return;
  //   }

  //   this.headercomp.emit(item);
  // }

  // public isActive(item:string):boolean{
  //   return this.activeItem === item;
  // }
  
  // public isInactive(item:string):boolean{
  //   return !(this.activeItem === item);
  // }
}
