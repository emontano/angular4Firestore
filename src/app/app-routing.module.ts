import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientService } from './services/client.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

//create Routes
const appRoutes: Routes =[
  {path: '', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate:[RegisterGuard]},
  {path: 'client/add', component: AddClientComponent,canActivate:[AuthGuard]},
  {path: 'client/edit/:id', component:EditClientComponent,canActivate:[AuthGuard]},
  {path: 'client/:id', component:ClientDetailsComponent,canActivate:[AuthGuard]},
  {path: 'settings', component: SettingsComponent,canActivate:[AuthGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  exports:[RouterModule],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuard,RegisterGuard]
})
export class AppRoutingModule { }
