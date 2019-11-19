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
    public characteres: Array<NeuralNetworkService.Character>;

    constructor(public matrixService: MatrixService, public neuralNetworkService: NeuralNetworkService) { }

    public ngOnInit(): void {
        this.characteres = this.neuralNetworkService.characteres;
        let neuralNetwork = new NeuralNetworkService.NeuralNetwork(48, 12, 48);

        let a = this.matrixService.arrayToMatrix(this.characteres[0].bits);
        console.log(a);

        // let dataset = {
        //     inputs: [
        //         [1, 1],
        //         [1, 0],
        //         [0, 1],
        //         [0, 0]
        //     ],
        //     outputs: [
        //         [0],
        //         [1],
        //         [1],
        //         [0]
        //     ]
        // }

        let dataset = new Dataset();

        this.characteres[0].bits.forEach(b => {
            dataset.inputs.push(this.getRandomInt(0, 2));
            dataset.outputs.push(b);
        });

        let train = true;

        while(train){
            for (let i = 0; i < 10000; i++){
                let index = this.getRandomInt(0, 4);

                this.neuralNetworkService.train(neuralNetwork, dataset.inputs, dataset.outputs);
            }

            if(this.neuralNetworkService.predict(neuralNetwork, dataset.inputs)[0] < 0.04 && this.neuralNetworkService.predict(neuralNetwork,dataset.inputs)[1] > 0.98){
                train = false;
                console.log("terminou");
            }
        }

        // let m1 = new MatrixService.Matrix(1, 2);
        // let m2 = new MatrixService.Matrix(2, 1);

        // let multiply = this.matrixService.multiply(m1, m2);

        // this.neuralNetworkService.train(neuralNetwork, [1, 2], [0, 1]);
    }

    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}

export class Dataset {
    public inputs: Array<number> = [];
    public outputs: Array<number> = [];
}
