import { Component, OnInit } from '@angular/core';
import { MatrizService } from './services/matriz.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'neural-networks';

    constructor(public matrizService: MatrizService){}

    public ngOnInit(): void {
        let m = new MatrizService.Matriz(4, 4);

        console.log(m)
    }
}
