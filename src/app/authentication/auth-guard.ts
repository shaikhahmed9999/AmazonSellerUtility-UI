import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PermissionConstant } from "../authentication/permission-constant";
import { AuthenticationService } from '../authentication/authentication.service';
import { Console } from 'console';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            if(route.data.Permissions !== undefined){
            currentUser.roles.forEach(value =>{
            if(route.data.Permissions !== value){
                this.router.navigate(['/access-denied']);
              }
            });
           }
            // logged in so return true
          return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login']);
        return false;
    }
}