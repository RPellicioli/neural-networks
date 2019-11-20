import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MatrixService } from './services/matrix.service';
import { NeuralNetworkService } from './services/neural-network.service';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        FormsModule
    ],
    providers: [
        MatrixService,
        NeuralNetworkService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
