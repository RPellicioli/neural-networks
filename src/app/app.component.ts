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
    public inputNodes = 48;
    public hideNodes = 24;
    public outputNodes = 36;
    public learningRate = 0.1;
    public numberOfEntries = 500;
    public max = 1000;

    public isStart: boolean;

    public neuralNetwork: NeuralNetworkService.NeuralNetwork;
    public datasetTrain: Array<NeuralNetworkService.Character>;
    public datasetTest: Array<NeuralNetworkService.Character>;

    constructor(public matrixService: MatrixService, public neuralNetworkService: NeuralNetworkService) { }

    public ngOnInit(): void {
        this.characteres = this.neuralNetworkService.characteres;
    }

    public createDataset(): void {
        //Inicializa a rede neural
        this.neuralNetwork = new NeuralNetworkService.NeuralNetwork(this.inputNodes, this.hideNodes, this.outputNodes, this.learningRate);
        this.datasetTrain = this.neuralNetworkService.createTrainingEntries(this.numberOfEntries);
        this.datasetTest = this.neuralNetworkService.createTestEntries(10);

        this.isStart = true;

        console.log(this.datasetTrain);
        console.log(this.datasetTest);
    }

    public start(): void {
        this.neuralNetworkService.trainNetwork(this.neuralNetwork, this.datasetTrain);
        this.neuralNetworkService.testNetwork(this.neuralNetwork, this.datasetTest);

        console.log(this.neuralNetwork.confusionMatrix);
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
