import { Injectable } from '@angular/core';
import { MatrixService } from './matrix.service';

@Injectable({
    providedIn: 'root'
})
export class NeuralNetworkService {
    public characteres: Array<NeuralNetworkService.Character>;

    constructor(public matrixService: MatrixService) {
        this.characteres = [
            {
                name: 'A',
                stringBits: '011110100001100001100001111111100001100001100001',
                code: 65
            },
            {
                name: 'B',
                stringBits: '111110100001100001111110100001100001100001111110',
                code: 66
            },
            {
                name: 'C',
                stringBits: '011111100000100000100000100000100000100000011111',
                code: 67
            },
            {
                name: 'D',
                stringBits: '111110100001100001100001100001100001100001111110',
                code: 68
            },
            {
                name: 'E',
                stringBits: '111111100000100000111111100000100000100000111111',
                code: 69
            },
            {
                name: 'F',
                stringBits: '111111100000100000100000111111100000100000100000',
                code: 70
            },
            {
                name: 'G',
                stringBits: '011111100000100000100000100111100001100001011110',
                code: 71
            },
            {
                name: 'H',
                stringBits: '100001100001100001100001111111100001100001100001',
                code: 72
            },
            {
                name: 'I',
                stringBits: '111111001100001100001100001100001100001100111111',
                code: 73
            },
            {
                name: 'J',
                stringBits: '111111000100000100000100000100100100100100011100',
                code: 74
            },
            {
                name: 'K',
                stringBits: '100010100100101000110000110000101000100100100010',
                code: 75
            },
            {
                name: 'L',
                stringBits: '100000100000100000100000100000100000100000111111',
                code: 76
            },
            {
                name: 'M',
                stringBits: '100001110011101101100001100001100001100001100001',
                code: 77
            },
            {
                name: 'N',
                stringBits: '110001110001101001101001100101100101100011100011',
                code: 78
            },
            {
                name: 'O',
                stringBits: '011110100001100001100001100001100001100001011110',
                code: 79
            },
            {
                name: 'P',
                stringBits: '111110100001100001100001111110100000100000100000',
                code: 80
            },
            {
                name: 'Q',
                stringBits: '011110100001100001100001100001100101011110000010',
                code: 81
            },
            {
                name: 'R',
                stringBits: '111110100001100001111110101000100100100010100001',
                code: 82
            },
            {
                name: 'S',
                stringBits: '011111100000100000011110000001000001000001111110',
                code: 83
            },
            {
                name: 'T',
                stringBits: '111111001100001100001100001100001100001100001100',
                code: 84
            },
            {
                name: 'U',
                stringBits: '100001100001100001100001100001100001100001111111',
                code: 85
            },
            {
                name: 'V',
                stringBits: '100001100001100001010010010010010010001100001100',
                code: 86
            },
            {
                name: 'W',
                stringBits: '100001100001100001100001100001101101110011100001',
                code: 88
            },
            {
                name: 'X',
                stringBits: '100001010010010010001100001100010010010010100001',
                code: 89
            },
            {
                name: 'Y',
                stringBits: '100001100001010010010010001100001100001100001100',
                code: 90
            },
            {
                name: 'Z',
                stringBits: '111111000001000010000100001000010000100000111111',
                code: 91
            }
        ];

        // stringBits: '111110 100001 100001 100001 111110 100000 100000 100000',

        //random usar caracter valido

        this.characteres.forEach(c => {
            c.bits = [];

            for(let i = 0; i < c.stringBits.length; i++){
                c.bits.push(Number(c.stringBits[i])); 
            }
        });
    }

    public feedForward(neuralNetwork: NeuralNetworkService.NeuralNetwork, input: Array<number>): void {
        // INPUT => HIDE
        let inputMatrix = this.matrixService.arrayToMatrix(input);
        let hideMatrix = this.matrixService.multiply(neuralNetwork.weigthsInputForHide, inputMatrix);

        hideMatrix = this.matrixService.sum(hideMatrix, neuralNetwork.biasInputForHide);
        hideMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        // HIDE => OUTPUT
        let outputMatrix = this.matrixService.multiply(neuralNetwork.weigthsHideForOutput, hideMatrix);
        outputMatrix = this.matrixService.sum(outputMatrix, neuralNetwork.biasHideForOutput);
        outputMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });
    }

    public train(neuralNetwork: NeuralNetworkService.NeuralNetwork, input: Array<number>, output: Array<number>): void {
        // FEEDFORWARD
        // INPUT => HIDE
        let inputMatrix = this.matrixService.arrayToMatrix(input);
        let hideMatrix = this.matrixService.multiply(neuralNetwork.weigthsInputForHide, inputMatrix);

        hideMatrix = this.matrixService.sum(hideMatrix, neuralNetwork.biasInputForHide);
        hideMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        // HIDE => OUTPUT
        let outputMatrix = this.matrixService.multiply(neuralNetwork.weigthsHideForOutput, hideMatrix);
        outputMatrix = this.matrixService.sum(outputMatrix, neuralNetwork.biasHideForOutput);
        outputMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        // BACKPROPAGATION
        // OUTPUT => HIDE
        let expected = this.matrixService.arrayToMatrix(output);
        let outputError = this.matrixService.subtract(expected, outputMatrix);
        let hideTranspose = this.matrixService.transpose(hideMatrix);
        let derivedOutput = outputMatrix.onMap((value, i, j) => {
            return this.derivedSigmoid(value);
        });

        let gradient = this.matrixService.hadamard(derivedOutput, outputError);
        gradient = this.matrixService.scalarMultiply(gradient, neuralNetwork.learningRate);

        //Ajusta Bias
        neuralNetwork.biasHideForOutput = this.matrixService.sum(neuralNetwork.biasHideForOutput, gradient);

        //Pega os valores de correção dos pesos
        let weigthsCorrectionHideForOutput = this.matrixService.multiply(gradient, hideTranspose);

        //Aplica as correções nos pesos
        neuralNetwork.weigthsHideForOutput = this.matrixService.sum(neuralNetwork.weigthsHideForOutput, weigthsCorrectionHideForOutput);

        // HIDE => INPUT
        let weigthsTransposeHideForOutput = this.matrixService.transpose(neuralNetwork.weigthsHideForOutput);
        let hideError = this.matrixService.multiply(weigthsTransposeHideForOutput, outputError);
        let inputTranspose = this.matrixService.transpose(inputMatrix);
        let derivedHide = hideMatrix.onMap((value, i, j) => {
            return this.derivedSigmoid(value);
        });
        
        let hideGradient = this.matrixService.hadamard(derivedHide, hideError);
        hideGradient = this.matrixService.scalarMultiply(hideGradient, neuralNetwork.learningRate);

        //Ajusta Bias
        neuralNetwork.biasInputForHide = this.matrixService.sum(neuralNetwork.biasInputForHide, hideGradient);

        //Pega os valores de correção dos pesos
        let weigthsCorrectionInputForHide = this.matrixService.multiply(hideGradient, inputTranspose);

        //Aplica as correções nos pesos
        neuralNetwork.weigthsInputForHide = this.matrixService.sum(neuralNetwork.weigthsInputForHide, weigthsCorrectionInputForHide);
    }

    //test entry
    public predict(neuralNetwork: NeuralNetworkService.NeuralNetwork, arr: Array<number>): Array<number> {
        // INPUT => HIDE
        let inputMatrix = this.matrixService.arrayToMatrix(arr);
        let hideMatrix = this.matrixService.multiply(neuralNetwork.weigthsInputForHide, inputMatrix);

        hideMatrix = this.matrixService.sum(hideMatrix, neuralNetwork.biasInputForHide);
        hideMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        // HIDE => OUTPUT
        let outputMatrix = this.matrixService.multiply(neuralNetwork.weigthsHideForOutput, hideMatrix);
        outputMatrix = this.matrixService.sum(outputMatrix, neuralNetwork.biasHideForOutput);
        outputMatrix.onMap((value, i, j) => {
            return this.rigid(this.sigmoid(value));
        });

        return this.matrixService.matrixToArray(outputMatrix); 
    }

    public sigmoid(value: number): number {
        return 1 / (1 + Math.exp(-value));
    }

    public derivedSigmoid(value: number): number {
        return value * (1 - value);
    }

    public rigid(value: number): number {
        if(value < 0.04) return 0;
        if(value > 0.98) return 1;

        return value;
    }
}

export namespace NeuralNetworkService {
    export class NeuralNetwork {
        public inputNodes: number;
        public hideNodes: number;
        public outputNodes: number;
        public learningRate: number;
        public biasInputForHide: MatrixService.Matrix;
        public biasHideForOutput: MatrixService.Matrix;
        public weigthsInputForHide: MatrixService.Matrix;
        public weigthsHideForOutput: MatrixService.Matrix;

        constructor(inputNodes: number, hideNodes: number, outputNodes: number, learningRate: number) {
            this.inputNodes = inputNodes;
            this.hideNodes = hideNodes;
            this.outputNodes = outputNodes;
            this.learningRate = learningRate;

            this.biasInputForHide = new MatrixService.Matrix(this.hideNodes, 1);
            this.biasHideForOutput = new MatrixService.Matrix(this.outputNodes, 1);

            this.biasInputForHide.randomize();
            this.biasHideForOutput.randomize();

            this.weigthsInputForHide = new MatrixService.Matrix(this.hideNodes, this.inputNodes);
            this.weigthsHideForOutput = new MatrixService.Matrix(this.outputNodes, this.hideNodes);

            this.weigthsInputForHide.randomize();
            this.weigthsHideForOutput.randomize();
        }
    }

    export class Character {
        public name: string;
        public stringBits: string;
        public bits?: Array<number>;
        public code: number;
        public active?: boolean;
    }
}