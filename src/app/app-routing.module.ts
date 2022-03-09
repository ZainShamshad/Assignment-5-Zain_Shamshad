import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGaurd } from 'src/gaurds/admin.gaurd';
import { AboutUsComponent } from './about-us/about-us.component';
import { AccessBlockedComponent } from './access-blocked/access-blocked.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'home', component:HomeComponent},
  {path: 'blogs', component:BlogsComponent},
  {path: 'login', component:LoginComponent},
  {path: 'aboutus', component:AboutUsComponent},
  {path: 'access-denied', component:AccessBlockedComponent},
  {
    path: 'users',
    component:UsersComponent,
    canActivate: [AdminGaurd],
    canActivateChild: [AdminGaurd],
    children:[
      {path:':id', component:UserComponent },
      {path:':id/edit', component:EditUserComponent }
    ]
  },
  {path: 'page-not-found', component:PageNotFoundComponent},
  {path: '**',redirectTo:'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
