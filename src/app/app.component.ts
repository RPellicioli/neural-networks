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
        let neuralNetwork = new NeuralNetworkService.NeuralNetwork(6, 4, 48);

        let a = this.matrixService.arrayToMatrix(this.characteres[0].bits);

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
        let indexCharactere = this.getRandomInt(0, this.characteres.length);

        this.characteres[indexCharactere].bits.forEach(b => {
            dataset.inputs.push(this.getRandomInt(0, 2));
            dataset.outputs.push(b);
        });

        let train = true;
        let generationsTotal = 0;
        let max = 100;
        console.log("Início do treinamento");

        while(train){
            generationsTotal++;
            console.log("Número da Geração: " + generationsTotal);

            for (let i = 0; i < max; i++){
                this.neuralNetworkService.train(neuralNetwork, dataset.inputs, dataset.outputs);
            }

            //this.neuralNetworkService.predict(neuralNetwork, dataset.inputs)[0] < 0.04 && this.neuralNetworkService.predict(neuralNetwork,dataset.inputs)[1] > 0.98
            if(this.verifyResult(neuralNetwork, dataset)){
                train = false;
                this.characteres[indexCharactere].active = true;
                
                console.log("Caracter Encontrado: " + this.characteres[indexCharactere].name, "| Código: " + this.characteres[indexCharactere].code)
            }
        }
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
