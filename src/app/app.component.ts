import { Component, OnInit } from '@angular/core';
import { MatrixService } from './services/matrix.service';
import { NeuralNetworkService } from './services/neural-network.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'neural-networks';

    constructor(public matrixService: MatrixService, public neuralNetworkService: NeuralNetworkService) { }

    public ngOnInit(): void {
        let m1 = new MatrixService.Matrix(1, 2);
        let m2 = new MatrixService.Matrix(2, 1);

        let multiply = this.matrixService.multiply(m1, m2);
        let neuralNetwork = new NeuralNetworkService.NeuralNetwork(1, 3, 6);

        this.neuralNetworkService.feedForward(neuralNetwork, [1, 2]);
    }
}
