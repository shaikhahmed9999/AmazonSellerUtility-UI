import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import { AuthenticationService } from "../authentication/authentication.service";
import { threadId } from 'worker_threads';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    
    public userName:string;
    public password:string;

    constructor(public router: Router,public authenticationService:AuthenticationService) {}

    ngOnInit() {}
    onLoggedin() {
        this.authenticationService.login(this.userName,this.password);
        this.router.navigate(['/dashboard'])       
    }

    onLoggedout(){
        this.authenticationService.logout();
    }
}
