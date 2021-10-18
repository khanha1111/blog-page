import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DetailArticleComponent } from './home/detail-article/detail-article.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailArticleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,     
    AppRoutingModule,
    NgbModule
  ],
  entryComponents: [DetailArticleComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
