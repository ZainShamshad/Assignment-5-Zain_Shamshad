import { Component, Input, Output, EventEmitter } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { EditUserComponent } from '../users/edit-user/edit-user.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent{

  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {

  }

  title:string = "Forgot";
  subtitle:string = " Username/ Password?";
  welcome:string = "";
  username:string ="";
  ngusername:string = "";
  ngpassword:string = "";

  login() {
    if(this.ngusername.length<1 || this.ngpassword.length<1){
      this.showRequired();
      return;
    }

    let userFound = false;

    for(let index=0; index<this.userService.getAllServiceUsers().length; index++){
      // debugger
      let un = this.userService.getAllServiceUsers()[index].getUsername();
      if( un ===this.ngusername){

        userFound = true;

        if(this.userService.getAllServiceUsers()[index].getPassword()===this.ngpassword){
          this.ngusername = this.ngpassword = "";
          this.userService.getAllServiceUsers()[index].loginAttemptsFailed=0;
          this.userService.setLoggedInUser(this.userService.getAllServiceUsers()[index]);
          this.showSuccess();
          this.welcome =("W E L C O M E "+" \u2022 "+this.userService.getAllServiceUsers()[index].getUsername().toUpperCase());
          this.router.navigate(['/blogs']);
          break;
        }
        else{
          this.userService.getAllServiceUsers()[index] = this.flagFailure(this.userService.getAllServiceUsers()[index]);
          break;
        }
      }
    }

    if(!userFound){
      this.showUnregistered();
    }
  }


  create(){

  }

  flagFailure(user:any): any{
    if(user.falgs<3){
      user.falgs++;
      this.showFailure();
    }
    else if(user.falgs==3){
      if(!user.blocked){
        user.blocked = true;
      }
      this.showBlocked();
    }
    return user;
  }

  showRequired() {
    this.toastr.info("Please Enter username and password first","Required*");
  }

  showSuccess() {
    this.toastr.success('Login Successfull!', 'Congratulations!');
  }

  showFailure() {
    this.toastr.error('Login Failed!', 'Invalid Credentials!');
  }

  showBlocked() {
    this.toastr.warning('User Not Allowed!', 'Account Blocked!');
  }

  showUnregistered() {
    this.toastr.info('User Not Found!', 'Username is not recognised!');
  }

}
