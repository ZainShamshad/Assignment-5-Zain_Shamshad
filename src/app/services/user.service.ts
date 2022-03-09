import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { JSONToModelUserConverter } from '../shared/JSONToModelUserConverter';

const USERS_URL = environment.baseUrl + '/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: User[] = []; 
  private loggedInUser = new User();

  @Output('userEmitter') userEmitter:EventEmitter<User> = new EventEmitter<User>();  

  @Output('usersEmitter') usersEmitter:EventEmitter<User[]> = new EventEmitter<User[]>();

  constructor(
    private http: HttpClient
  ) {
    //auto fetch all users from server whenever service is instantiated
    this.getAllServerUsers();
  }

  public getLoggedInUser(){
    return this.loggedInUser;
  }

  public setLoggedInUser(loggedInUser:User){
    this.loggedInUser = loggedInUser;
    this.userEmitter.emit(loggedInUser);
  }

  public getAllServiceUsers(){
    return this.users;
  }


  public getServiceUserById(id:number): User | undefined{
    for(const user of this.users){
      if(user.getId() === id){
        return user;
      }
    }
    return undefined;
  }
  

  public setServiceUsers(users:User[]){
    this.users = users;
  }

  public getAllServerUsers(){
    this.http.get(USERS_URL).subscribe( data =>{
      this.users = JSONToModelUserConverter.convert(data as User[]);
      this.usersEmitter.emit(this.users);
      return this.users;
    });
  }

  public getServerUserById(id:number){
    this.http.get(USERS_URL + "/"+id).subscribe( user => {
      return user as User;
    });
  }

  public getServerUserByUsername(username:string){
    this.http.get(USERS_URL + "/"+username).subscribe( user => {
      return user as User;
    });
  }

  public addUser(user:User) {
    debugger
    if(user !== undefined) {
      this.http.post(USERS_URL,user).subscribe(data =>{
        this.users.push(user);
        this.usersEmitter.emit(this.users);
      })
    }
  }

  public updateUser(user:User, index:number) {
    this.http.put(USERS_URL+"/"+user.getId(),user).subscribe( data =>{
      this.users[index] = user;
      this.usersEmitter.emit(this.users);
    })
  }

  public deleteUser(index:number) {
    this.http.delete(USERS_URL+"/"+this.users[index].getId()).subscribe(res =>{
      this.users.splice(index,1);
      this.usersEmitter.emit(this.users);
    })
  }

  public blockUser(username:string) {
    for(let i=0; i<this.users.length;i++) {
      if(username === this.users[i].getUsername()) {
        this.users[i].setBlocked(true);
        this.http.put(USERS_URL+"/"+this.users[i].getId(),this.users[i]).subscribe(data =>{
          this.usersEmitter.emit(this.users);
        });
        break;
      }
    }
  }

  updateRole(i:number){
    this.users[i].setRole(this.users[i].getRole() === 'ADMIN'?'QA':'ADMIN');
    this.http.put(USERS_URL+"/"+this.users[i].getId(),this.users[i]).subscribe(data =>{
      this.usersEmitter.emit(this.users);
    });
  }

  public logUsers() {
    console.log("log users");
    for(let i=0; i<this.users.length;i++) {
      console.log(this.users[i]);
    }
  }
  
  public updateFlags(username:string) {
    for(let i=0; i<this.users.length;i++) {
      if(username === this.users[i].getUsername()) {
        this.users[i].loginAttemptsFailed++;
        if(this.users[i].loginAttemptsFailed === 3) {
          this.users[i].setBlocked(true);
        }
        this.http.put(USERS_URL+"/"+this.users[i].getId(),this.users[i]).subscribe(data =>{
          this.usersEmitter.emit(this.users);
        });
        break;
      }
    }
  }
}