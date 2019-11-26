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

    constructor(public matrixService: MatrixService, public neuralNetworkService: NeuralNetworkService) { }

    public ngOnInit(): void {
        this.characteres = this.neuralNetworkService.characteres;
    }

    public start(): void {
        let indexCharactere = this.getRandomInt(0, this.characteres.length);
        
        let generationsTotal = 0;
        let train = true;

        //Inicializa a rede neural
        let neuralNetwork = new NeuralNetworkService.NeuralNetwork(this.inputNodes, this.hideNodes, this.outputNodes, this.learningRate);
        let datasetTrain = this.neuralNetworkService.createTrainingEntries(this.numberOfEntries);
        let datasetTest = this.neuralNetworkService.createTrainingEntries(this.numberOfEntries);

        this.neuralNetworkService.trainNetwork(neuralNetwork, datasetTrain);
        this.neuralNetworkService.testNetwork(neuralNetwork, datasetTest);

        console.log(neuralNetwork.confusionMatrix);

        // EXEMPLO XOR - Portas Lógicas
        // let dataset = {
        //     inputs: [
        //       [0, 0],
        //       [0, 1],
        //       [1, 0],
        //       [1, 1],
        //     ],
        //     outputs: [
        //         [0],
        //         [1],
        //         [1],
        //         [0]
        //     ]
        // }

        //saida mais proxima a 1 para setar o certo

        // this.characteres.forEach(f => f.active = false);

        // this.characteres[indexCharactere].bits.forEach(b => {
        //     dataset.inputs.push(Math.floor(Math.random() * 10));
        //     dataset.outputs.push(b);
        // });

        // console.log("Início do treinamento");

        // while(train){
        //     generationsTotal++;
        //     console.log("Número da Geração: " + generationsTotal);

        //     for (let i = 0; i < this.max; i++){
        //         this.neuralNetworkService.train(neuralNetwork, dataset.inputs, dataset.outputs);
        //     }

        //     //this.neuralNetworkService.predict(neuralNetwork, dataset.inputs)[0] < 0.04 && this.neuralNetworkService.predict(neuralNetwork,dataset.inputs)[1] > 0.98
        //     if(this.verifyResult(neuralNetwork, dataset)){
        //         train = false;
        //         this.characteres[indexCharactere].active = true;
                
        //         console.log("Caracter Encontrado: " + this.characteres[indexCharactere].name, "| Código: " + this.characteres[indexCharactere].code)
        //     }
        // }
    }

    private verifyResult(neuralNetwork: NeuralNetworkService.NeuralNetwork, dataset: Dataset): boolean {
        let count = 0;
        
        dataset.outputs.forEach((output, i) => {
            console.log("RESULTADO PREVISTO: " + this.neuralNetworkService.predict(neuralNetwork, dataset.inputs)[i], "| SAIDA ESPERADA: " + output, "| INDEX: " + i);

            if(this.neuralNetworkService.predict(neuralNetwork, dataset.inputs)[i] == output){
                count++;
            }
        });

        console.log('Número de saídas corretas: ' + count, '\n', '\n');

        return count == dataset.outputs.length;
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
