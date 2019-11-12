import { Component, OnInit } from '@angular/core';
import { MatrixService } from './services/matrix.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'neural-networks';

    constructor(public matrixService: MatrixService){}

    public ngOnInit(): void {
        let m1 = new MatrixService.Matrix(1, 2);
        let m2 = new MatrixService.Matrix(2, 1);
        console.log(m1.data, m2.data);

        let multiply = this.matrixService.multiply(m1, m2);
        console.log(multiply.data);
    }
}
