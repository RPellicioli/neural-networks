import { Injectable } from '@angular/core';
import { MatrixService } from './matrix.service';

@Injectable({
    providedIn: 'root'
})
export class NeuralNetworkService {
    constructor(public matrixService: MatrixService) { }

    public feedForward(neuralNetwork: NeuralNetworkService.NeuralNetwork, input: Array<number>): void{
        // INPUT => HIDE
        let inputMatrix =  this.matrixService.arrayToMatrix(input);
        let hideMatrix =  this.matrixService.multiply(neuralNetwork.weigthsForInputHide, inputMatrix);

        hideMatrix = this.matrixService.sum(hideMatrix, neuralNetwork.biasForInputHide);
        hideMatrix = this.matrixService.onMap(hideMatrix, (value, i, j) => {
            return this.sigmoid(value);
        });

        // HIDE => OUTPUT
        let outputMatrix =  this.matrixService.multiply(neuralNetwork.weigthsForHideOutput, hideMatrix);
        outputMatrix = this.matrixService.sum(outputMatrix, neuralNetwork.biasForHideOutput);
        outputMatrix = this.matrixService.onMap(outputMatrix, (value, i, j) => {
            return this.sigmoid(value);
        });

        outputMatrix.print();
    }

    public sigmoid(x): number {
        return 1 / (1 + Math.exp(-x));
    }
}

export namespace NeuralNetworkService {
    export class NeuralNetwork {
        public inputNodes: number;
        public hideNodes: number;
        public outputNodes: number;
        public biasForInputHide: MatrixService.Matrix;
        public biasForHideOutput: MatrixService.Matrix;
        public weigthsForInputHide: MatrixService.Matrix;
        public weigthsForHideOutput: MatrixService.Matrix;

        constructor(inputNodes: number, hideNodes: number, outputNodes: number) {
            this.inputNodes = inputNodes;
            this.hideNodes = hideNodes;
            this.outputNodes = outputNodes;

            this.biasForInputHide = new MatrixService.Matrix(this.hideNodes, 1);
            this.biasForHideOutput = new MatrixService.Matrix(this.outputNodes, 1);

            this.biasForInputHide.randomize();
            this.biasForHideOutput.randomize();

            this.weigthsForInputHide = new MatrixService.Matrix(this.hideNodes, this.inputNodes);
            this.weigthsForHideOutput = new MatrixService.Matrix(this.outputNodes, this.hideNodes);

            this.weigthsForInputHide.randomize();
            this.weigthsForHideOutput.randomize();
        }
    }
}