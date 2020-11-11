import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { SessionService } from './controllers/session/session.service';
import { ComponentsModule } from './shared/components/components.module';
import { AuthModule } from './pages/auth/auth.module';
import { ProfileModule } from './pages/profile/profile.module';
import { UserService } from './controllers/user/user.service';
import { AdvertsModule } from './pages/adverts/adverts.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ComponentsModule,
    HomeModule,
    AuthModule,
    ProfileModule,
    AdvertsModule,
  ],
  providers: [
    SessionService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
