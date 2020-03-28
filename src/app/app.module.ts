import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './pages/home/home.module';
import { SessionService } from './controllers/session/session.service';
import { ComponentsModule } from './shared/components/components.module';
import { AuthModule } from './pages/auth/auth.module';
import { ProfileModule } from './pages/profile/profile.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HomeModule,
    AuthModule,
    ProfileModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
