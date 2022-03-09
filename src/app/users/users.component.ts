import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { JSONToModelUserConverter } from '../shared/JSONToModelUserConverter';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // this.users = JSONToModelUserConverter.convert(this.userService.getAllServerUsers() as any);
    this.users = userService.getAllServiceUsers();
    this.userService.usersEmitter.subscribe( users =>{
      this.users = users;
    })

    // route.params.subscribe(params =>{
    //   this.viewById(params['id']);
    // })
  }

  ngOnInit(): void {
  }

  public view(i:number){
    // this.router.navigate([this.users[i].getId()], {relativeTo: this.route})
    this.viewById(this.users[i].getId());
  }

  public viewById(id:number){
    this.router.navigate([id], {relativeTo: this.route})
  }

  public edit(i:number) {
    this.router.navigate([this.users[i].getId()+'/edit'], {relativeTo: this.route})
  }
  public delete(i:number):void{
    if(confirm("Are you sure you want to delete this user?")){
      this.userService.deleteUser(i);
      this.toastr.success("USER DELETED SUCCESSFULLY","SUCCESS");
    }
  }

  changeRole(i:number){
    this.userService.updateRole(i);
  }

}
