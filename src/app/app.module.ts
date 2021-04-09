import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyTableComponent } from './my-table/my-table.component';
import { MyColsortDirective } from './my-colsort.directive';

@NgModule({
  declarations: [
    AppComponent,
    MyTableComponent,
    MyColsortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
  bootstrap: [MyTableComponent]
})
export class AppModule { }
