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
            }
        ];

        // stringBits: '111110 100001 100001 100001 111110 100000 100000 100000',

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
        let hideMatrix = this.matrixService.multiply(neuralNetwork.weigthsForInputHide, inputMatrix);

        hideMatrix = this.matrixService.sum(hideMatrix, neuralNetwork.biasForInputHide);
        hideMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        // HIDE => OUTPUT
        let outputMatrix = this.matrixService.multiply(neuralNetwork.weigthsForHideOutput, hideMatrix);
        outputMatrix = this.matrixService.sum(outputMatrix, neuralNetwork.biasForHideOutput);
        outputMatrix.onMap((value, i, j) => {
            return this.sigmoid(value);
        });

        outputMatrix.print();
    }

    public sigmoid(value: number): number {
        return 1 / (1 + Math.exp(-value));
    }

    public rigid(value: number): number {
        return value < 0.5 ? 0 : 1;
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

    export class Character {
        public name: string;
        public stringBits: string;
        public bits?: Array<number>;
        public code: number;
    }
}