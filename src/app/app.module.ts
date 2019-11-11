import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MatrizService } from './services/matriz.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [
        MatrizService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
