import { Component, Input, OnInit,EventEmitter,Output, SimpleChanges, OnChanges, OnDestroy, AfterViewInit } from '@angular/core';
// import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { EditBlogComponent } from './edit-blog/edit-blog.component';
import { Blog } from '../models/blog';
import { User } from '../models/user';
import { BlogService } from '../services/blog.service';
import { JSONToModelConverter } from '../shared/JSONToModelConverter';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {


  public user:User=new User();

  public bullet:string = "\u2022";
  public search:string = "";
  filteredBlogs:any = []
  public blogsTotal:number = 0;
  private subscription:Subscription;

  constructor(
    // private dialog: MatDialog,
    private blogService: BlogService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private dialog: MatDialog
    ) {

      blogService.getAllServerBlogs().subscribe( data =>{
        this.filteredBlogs = JSONToModelConverter.convert(data as any);
        this.blogService.setServiceBlogs(this.filteredBlogs);
        this.blogsTotal = this.filteredBlogs.length;
        this.spinner.hide();
      });
  
      
      this.subscription = this.blogService.blogsEmitter.subscribe(res =>{
        this.filteredBlogs = res;
        this.blogsTotal = res.length;
      });
      
      this.user = userService.getLoggedInUser();
  }
  
  ngOnInit(): void {
  }

  ngOnChanges(simpleChanges:SimpleChanges){
  }

  ngAfterViewInit(): void {
    this.spinner.show();
  }


  public edit(index:number):void{
    this.openDialog(this.filteredBlogs[index],index);
  }

  openDialog(blog:Blog, index:number): void {
    const dialogRef = this.dialog.open(EditBlogComponent, {data:{blog:blog, index:index, user:this.user}});
    
    const dialogSubmitSubscription = dialogRef.componentInstance.published.subscribe(result => {

      dialogSubmitSubscription.unsubscribe();
    });

    dialogRef.afterClosed().subscribe(result => {});
  }


  public searchBlogs():void{
    this.filteredBlogs = this.blogService.getAllServiceBlogs().filter(s => s.getTitle().toLowerCase().includes(this.search.toLowerCase()));
  }

  public seeAction(i:number):void {
    this.filteredBlogs[i].expanded = !this.filteredBlogs[i].expanded;
  }

  public getAction(i:number):string{
    if(this.filteredBlogs[i].expanded){
      return "see less";
    }
    return "see more";
  }


  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
