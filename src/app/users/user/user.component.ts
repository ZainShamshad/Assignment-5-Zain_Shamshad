import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  user:User | undefined = undefined;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    route.params.subscribe(params =>{
      let id = +params['id'];
      console.log(id);
      this.user = this.userService.getServiceUserById(id);
      if(this.user === undefined){
        
      }
    })
  }

  ngOnInit(): void {
  }

}
