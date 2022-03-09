import { HttpClient } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { UserService } from './user.service';


const BLOGS_URL = environment.baseUrl + '/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  
  private blogs: Blog[]=[];
  @Output('blogs') blogsEmitter:EventEmitter<Blog[]> = new EventEmitter<Blog[]>();

  constructor(
    // private userService:UserService,
    private http: HttpClient
  ) { }

  
  public setServiceBlogs(blogs: Blog[]){
    this.blogs = blogs;
  }

  public getAllServiceBlogs(){
    return this.blogs;
  }

  public getAllServerBlogs(): Observable<any>{
    // this.http.get(BLOGS_URL).subscribe( (data) => {
    //   this.blogs = data as Blog[];
    //   return this.blogs;
    //   // this.blogsEmitter.emit(this.blogs);
    // });
    return this.http.get(BLOGS_URL);
  }

  public addBlog(blog:Blog){
    debugger
    blog.expanded = false;
    blog.setDate(new Date()+"");
    blog.setId(100+this.blogs.length+5);
    this.http.post(BLOGS_URL,blog).subscribe(data =>{
      this.blogs.push(blog);
      this.blogsEmitter.emit(this.blogs);
    },
    error =>{
      console.log(error);
    }
    );
  }

  public updateBlog(blog:Blog, index:number){
    this.http.put(BLOGS_URL+'/'+blog.getId(),blog).subscribe(data =>{
      this.blogs[index] = blog;
      this.blogsEmitter.emit(this.blogs);
    });
  }

  public deleteBlog(index:number){
    this.http.delete(BLOGS_URL+'/'+this.blogs[index].getId()).subscribe(data =>{
      this.blogs.splice(index,1);
      this.blogsEmitter.emit(this.blogs);
    });
  }


}
