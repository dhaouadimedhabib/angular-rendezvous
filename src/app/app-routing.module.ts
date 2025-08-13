import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ListerendezvousComponent } from './listerendezvous/listerendezvous.component';
import { ClientComponent } from './client/client.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { RegisterComponent } from './register/register.component';
import { ReservationComponent } from './reservation/reservation.component';
import { PlanificationComponent } from './planification/planification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ServicesComponent } from './services/services.component';
import { UpdateprofilComponent } from './updateprofil/updateprofil.component';
import { PayementComponent } from './payement/payement.component';
import { GoogleSigninComponent } from './google-signin/google-signin.component';
import { ReclamationComponent } from './reclamation/reclamation.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { BusinessnewsComponent } from './businessnews/businessnews.component';
import { Business1newsComponent } from './business1news/business1news.component';
import { Business2newsComponent } from './business2news/business2news.component';
import { ArticleComponent } from './article/article.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'listerdv', component: ListerendezvousComponent },
  { path: 'client', component: ClientComponent },
  { path: 'home', component: HomeComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'dashbord', component: DashbordComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reservation/:id', component: ReservationComponent },
  { path: 'plan', component: PlanificationComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'service', component: ServicesComponent },
  { path: 'update', component: UpdateprofilComponent },
  { path: 'paiement/:rendezVousId', component: PayementComponent },
  { path: 'signin', component: GoogleSigninComponent },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'post', component: PostListComponent },
  { path: 'detaille/:id', component: PostDetailsComponent },
  { path: 'news', component: BusinessnewsComponent },
  { path: 'news1', component: Business1newsComponent },
  { path: 'news2', component: Business2newsComponent },
  { path: 'article', component: ArticleComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
