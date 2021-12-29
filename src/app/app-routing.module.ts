import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth-guard';
import { PermissionConstant } from "../app/authentication/permission-constant";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./layout/layout.module').then((m) => m.LayoutModule),
        canActivate: [AuthGuard]
    },
    { path: 'login', loadChildren: () => import('./login/login.module').then((m) => m.LoginModule)
    },
    { path: 'signup', loadChildren: () => import('./signup/signup.module').then((m) => m.SignupModule)
      ,canActivate: [AuthGuard]
   },
    {
        path: 'error',
        loadChildren: () => import('./server-error/server-error.module').then((m) => m.ServerErrorModule)
        ,canActivate: [AuthGuard] 
    },
    {
        path: 'access-denied',
        loadChildren: () => import('./access-denied/access-denied.module').then((m) => m.AccessDeniedModule)
    },
    { path: 'not-found', loadChildren: () => import('./not-found/not-found.module').then((m) => m.NotFoundModule),
      canActivate: [AuthGuard],
      data:{
        Permissions: PermissionConstant.HAS_MODERATOR
        } 
     },
    { path: '**', redirectTo: 'not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
