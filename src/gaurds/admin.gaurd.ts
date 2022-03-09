import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Toast, ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";


@Injectable({
    providedIn: 'root'
  })
export class AdminGaurd implements CanActivate, CanActivateChild{

    constructor(
        private userService: UserService,
        private router: Router,
        private toastr: ToastrService
        ){

    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.canActivate(childRoute,state);
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.userService.getLoggedInUser() !== undefined){
            if(this.userService.getLoggedInUser() !== null){
                if(this.userService.getLoggedInUser().getUsername().length > 0){
                    if(this.userService.getLoggedInUser().getRole() === 'ADMIN'){
                        return true;
                    }
                    else{
                        this.router.navigate(['access-denied']);
                    }
                }
            }
        }
        this.toastr.error('login as an admin to visit the request page','Login Required');
        this.router.navigate(['/login']);
        return false;
    }
    
}