import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from "../../../authentication/authentication.service";

import { Observable } from 'rxjs';
import { UserDetails } from '../../../authentication/user-details';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    public pushRightClass: string;
   // public currentUser: string;
    public currentUserObj: UserDetails;


    constructor(private translate: TranslateService, public router: Router,public authenticationService:AuthenticationService) {
         let currentUser = localStorage.getItem("currentUser");
         this.currentUserObj = JSON.parse(currentUser);
        this.router.events.subscribe((val) => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        this.authenticationService.logout();
        this.router.navigate(["/login"]);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
