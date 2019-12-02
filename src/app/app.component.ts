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
    public numberOfEntrieTest = 10;
    public max = 1000;

    public isStart: boolean;
    public isTest: boolean;

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
        this.datasetTest = this.neuralNetworkService.createTestEntries(1000);

        this.isStart = true;
    }

    public start(): void {
        this.neuralNetworkService.trainNetwork(this.neuralNetwork, this.datasetTrain);

        this.isTest = true;
    }

    public test(): void {
        this.neuralNetworkService.testNetwork(this.neuralNetwork, this.datasetTest);
    }

    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public getPrecision(i: number): number {
        if(!this.neuralNetwork.finish) return 0;

        let truePositive = 0, falsePositive = 0

        for (let j = 0; j < this.neuralNetwork.outputNodesTotal; j++)
        {
            if (i == j)
            {
                truePositive += this.neuralNetwork.confusionMatrix.data[i][j];
            }
            else
            {
                falsePositive += this.neuralNetwork.confusionMatrix.data[j][i];
            }
        }

        if(truePositive == 0 && falsePositive == 0) return 0;
        
        return truePositive / (truePositive + falsePositive);
    }

    public getRecall(i: number): number {
        if(!this.neuralNetwork.finish) return 0;

        let truePositive = 0, falseNegative = 0

        for (let j = 0; j < this.neuralNetwork.outputNodesTotal; j++)
        {
            if (i == j)
            {
                truePositive += this.neuralNetwork.confusionMatrix.data[i][j];
            }
            else
            {
                falseNegative += this.neuralNetwork.confusionMatrix.data[i][j];
            }
        }

        if(truePositive == 0 && falseNegative == 0) return 0;
        
        return truePositive / (truePositive + falseNegative);
    }

    public getEspecify(i: number): number {
        if(!this.neuralNetwork.finish) return 0;

        let trueNegative = 0, falsePositive = 0

        for (let j = 0; j < this.neuralNetwork.outputNodesTotal; j++)
        {
            if (i == j)
            {
                for (let k = 0; k < this.neuralNetwork.outputNodesTotal; k++)
                {
                    if (k != i) { 
                        trueNegative += this.neuralNetwork.confusionMatrix.data[i][j];
                    }
                }
            }
            else
            {
                falsePositive += this.neuralNetwork.confusionMatrix.data[j][i];
            }
        }

        if(trueNegative == 0 && falsePositive == 0) return 0;
        
        return trueNegative / (trueNegative + falsePositive);
    }

    public getF1(i: number): number {
        if(!this.neuralNetwork.finish) return 0;

        let precision = this.getPrecision(i), recall = this.getRecall(i);

        if(precision == 0 && recall == 0) return 0;

        return (2 * (recall * precision)) / (recall + precision);
    }
}

export class Dataset {
    public inputs: Array<number> = [];
    public outputs: Array<number> = [];
}
