import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from "./admin.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from "../auth/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        //canActivate: [AuthGuard]
      },
      {
        path: 'sign-in',
        component: SignInComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

