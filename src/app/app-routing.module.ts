import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/authentication.guard';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthenticationGuard] },
  {
    path: 'authentication/signin',
    loadChildren: './authentication/signin/signin.module#SigninPageModule',
  },
  {
    path: 'authentication/signup',
    loadChildren: './authentication/signup/signup.module#SignupPageModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
