import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { VocabulariesComponent } from './vocabularies/vocabularies.component';
import { FlashcardsComponent } from './activities/flashcards/flashcards.component';
import { SentencesComponent } from './sentences/sentences.component';
import { StudysetsComponent } from './studysets/studysets.component';
import { QuizComponent } from './activities/quiz/quiz.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent, title: 'Home',  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, title: 'Users', data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, title: 'Roles', data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, title: 'Tenants', data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, title: 'Update Password', canActivate: [AppRouteGuard] },
                    { path: 'vocabularies', component: VocabulariesComponent, title: 'Vocabularies', canActivate: [AppRouteGuard] },
                    { path: 'sentences', component: SentencesComponent, title: 'Sentences', canActivate: [AppRouteGuard] },
                    { path: 'studysets', component: StudysetsComponent, title: 'Study Sets', canActivate: [AppRouteGuard] },
                    { path: 'flashcards', component: FlashcardsComponent, title: 'Flashcards', canActivate: [AppRouteGuard] },
                    { path: 'quiz', component: QuizComponent, title: 'Quiz', canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
