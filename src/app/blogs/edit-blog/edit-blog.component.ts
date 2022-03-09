import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
// import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { ToastrService } from 'ngx-toastr';
import { Blog } from '../../models/blog';
import { User } from '../../models/user';
import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-editblog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {

  @Output() published = new EventEmitter<Blog>();

  constructor(
      private toastr: ToastrService,
      private blogService: BlogService
      ,public dialogRef: MatDialogRef<EditBlogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
    ){

    }

  blog:Blog = new Blog();
  user:User = new User();

  ngOnInit(): void {
    this.blog = this.data.blog;
    this.title = this.blog.getTitle();
    this.details = this.blog.getDescription();
    this.button_action = this.data.index >-1 ? "Republish" : "Publish";
    this.sel_index = this.data.index;
    this.user = this.data.user;
  }

  public title:string ="";
  public details:string ="";
  public limit:number = 10;
  public max_limit:number = 2000;
  public button_action:string = "";
  public sel_index:number = -1;

  public create():void {
    if(this.title.length<1){
      this.toastr.error('Blog title is compulsory!','TITLE NOT FOUND');
      return;
    }
    if(this.details.length<this.limit){
      this.toastr.error('Atleast '+this.limit+' words are required for detail!','VERY FEW DETAILS');
      return;
    }
    if(this.details.length>this.max_limit){
      this.toastr.error('Only '+this.max_limit+' words are allowed for detail!','TOO MUCH DETAILS');
      return;
    }
    
    this.blog.setTitle(this.title);
    this.blog.setDescription(this.details);

    if(this.sel_index>-1){
      this.blogService.updateBlog(this.blog,this.sel_index);
    }
    else{
      this.blog.setCreator(this.user);
      this.blogService.addBlog(this.blog);
    }

    this.published.emit(this.blog);
    this.dialogRef.close();
  }
}
