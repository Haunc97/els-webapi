import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { VocabulariesComponent } from './vocabularies/vocabularies.component';
import { CreateVocabularyDialogComponent } from './vocabularies/create-vocabulary-dialog/create-vocabulary-dialog.component';
import { EditVocabularyDialogComponent } from './vocabularies/edit-vocabulary-dialog/edit-vocabulary-dialog.component';
import { ViewVocabularyDialogComponent } from './vocabularies/view-vocabulary-dialog/view-vocabulary-dialog.component';
import { FlashcardsComponent } from './activities/flashcards/flashcards.component';
import { SentencesComponent } from './sentences/sentences.component';
import { CreateSentenceDialogComponent } from './sentences/create-sentence-dialog/create-sentence-dialog.component';
import { EditSentenceDialogComponent } from './sentences/edit-sentence-dialog/edit-sentence-dialog.component';
import { ViewSentenceDialogComponent } from './sentences/view-sentence-dialog/view-sentence-dialog.component';
import { StudysetsComponent } from './studysets/studysets.component';
import { CreateStudysetDialogComponent } from './studysets/create-studyset-dialog/create-studyset-dialog.component';
import { EditStudysetDialogComponent } from './studysets/edit-studyset-dialog/edit-studyset-dialog.component';
import { CreateBulkVocabularyDialogComponent } from './vocabularies/create-bulk-vocabulary-dialog/create-bulk-vocabulary-dialog.component';
import { CreateBulkSentenceDialogComponent } from './sentences/create-bulk-sentence-dialog/create-bulk-sentence-dialog.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        VocabulariesComponent,
        CreateVocabularyDialogComponent,
        EditVocabularyDialogComponent,
        ViewVocabularyDialogComponent,
        FlashcardsComponent,
        SentencesComponent,
        CreateSentenceDialogComponent,
        EditSentenceDialogComponent,
        ViewSentenceDialogComponent,
        StudysetsComponent,
        CreateStudysetDialogComponent,
        EditStudysetDialogComponent,
        CreateBulkVocabularyDialogComponent,
        CreateBulkSentenceDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        CarouselModule
    ],
    providers: []
})
export class AppModule {}
