import { Injectable } from '@angular/core';
import { MatrixService } from './matrix.service';

@Injectable({
    providedIn: 'root'
})
export class NeuralNetworkService {
    public characteres: Array<NeuralNetworkService.Character>;
    public characteresAdditional: Array<NeuralNetworkService.Character>;

    constructor(public matrixService: MatrixService) {
        this.characteres = [
            {
                name: '0',
                stringBits: "001100010010100001100001100001100001010010001100",
                code: 48
            },
            {
                name: '1',
                stringBits: "001100010100000100000100000100000100000100111111",
                code: 49
            },
            {
                name: '2',
                stringBits: "011111100001000010000010000100001000010001111110",
                code: 50
            },
            {
                name: '3',
                stringBits: "011111100001000001000001001111000001100001011111",
                code: 51
            },
            {
                name: '4',
                stringBits: "000100001001010001111111000001000001000001000001",
                code: 52
            },
            {
                name: '5',
                stringBits: "111111100000100000100000111111000001000001111111",
                code: 53
            },
            {
                name: '6',
                stringBits: "111111100000100000100000111111100001100001111111",
                code: 54
            },
            {
                name: '7',
                stringBits: "111111000001000001000010000100001000010000100000",
                code: 55
            },
            {
                name: '8',
                stringBits: "111111100001100001111111111111100001100001111111",
                code: 56
            },
            {
                name: '9',
                stringBits: "111111100001100001111111000001000010000100001000",
                code: 57
            },
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

        this.characteresAdditional = [
            {
                name: '!',
                stringBits: '001100001100001100001100001100000000001100001100',
                code: 33
            },
            {
                name: '+',
                stringBits: '001100001100001100111111111111001100001100001100',
                code: 43
            },
            {
                name: '-',
                stringBits: '000000000000000000111111111111000000000000000000',
                code: 44
            },
            {
                name: '.',
                stringBits: '000000000000000000000000000000000000001100001100',
                code: 46
            },
            {
                name: '=',
                stringBits: '000000000000111111000000000000111111000000000000',
                code: 61
            },
            {
                name: '_',
                stringBits: '000000000000000000000000000000000000000000111111',
                code: 95
            }
        ];

        // stringBits: '111110 100001 100001 100001 111110 100000 100000 100000',

        this.characteres.forEach(c => {
            c.bits = [];

            for(let i = 0; i < c.stringBits.length; i++){
                c.bits.push(c.stringBits[i] == '1' ? Math.random() : 0);
            }
        });

        this.characteresAdditional.forEach(c => {
            c.bits = [];

            for(let i = 0; i < c.stringBits.length; i++){
                c.bits.push(c.stringBits[i] == '1' ? Math.random() : 0);
            }
        });
    }

    public createTrainingEntries(numberOfEntries: number): Array<NeuralNetworkService.Character> {
        var trainEntries = new Array<NeuralNetworkService.Character>();

        this.createWithoutNoise(trainEntries, numberOfEntries);

        return trainEntries;
    }

    public createTestEntries(numberOfEntries: number): Array<NeuralNetworkService.Character> {
        var newEntries = new Array<NeuralNetworkService.Character>();

        this.createWithoutNoise(newEntries, numberOfEntries * 0.34);

        this.createWithNoise(newEntries, numberOfEntries * 0.20, 2);

        this.createWithNoise(newEntries, numberOfEntries * 0.20, 6);

        this.createWithNoise(newEntries, numberOfEntries * 0.20, 12);

        this.createAdditional(newEntries, numberOfEntries * 0.06);

        return newEntries;
    }
    
    private createRandomEntry(): NeuralNetworkService.Character {
        let index = this.getRandomInt(0, this.characteres.length);

        var randomEntry = new NeuralNetworkService.Character();
        randomEntry.name = this.characteres[index].name;
        randomEntry.code = this.characteres[index].code;
        randomEntry.stringBits = this.characteres[index].stringBits;
        randomEntry.bits = this.characteres[index].bits.slice(0, this.characteres[index].bits.length);
        
        return randomEntry;
    }

    private createWithoutNoise(entries: Array<NeuralNetworkService.Character>, count: number): void {
        for (let i = 0; i < count; i++) {
            var randomEntry = this.createRandomEntry();

            entries.push(randomEntry);
        }
    }

    private createWithNoise(entries: Array<NeuralNetworkService.Character>, count: number, noise: number): void {
        for (let i = 0; i < count; i++) {
            var randomEntry = this.createRandomEntry();

            this.changeRandomValuesFromEntry(randomEntry, noise);

            entries.push(randomEntry);
        }
    }

    private createAdditional(entries: Array<NeuralNetworkService.Character>, count: number): void {
        for (let i = 0; i < count; i++) {
            let index = this.getRandomInt(0, this.characteresAdditional.length);

            var randomEntry = new NeuralNetworkService.Character();
            randomEntry.name = this.characteresAdditional[index].name;
            randomEntry.code = this.characteresAdditional[index].code;
            randomEntry.stringBits = this.characteresAdditional[index].stringBits;
            randomEntry.bits = this.characteresAdditional[index].bits.slice(0, this.characteresAdditional[index].bits.length);

            entries.push(randomEntry);
        }
    }

    private changeRandomValuesFromEntry(entry: NeuralNetworkService.Character, noise: number): void {
        for (let i = 0; i < noise; i++) {
            var index = this.getRandomInt(0, entry.bits.length);
            entry.bits[index] = entry.bits[index] > 0 ? 0 : Math.random();
        }
    }

    private getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public testNetwork(neuralNetwork: NeuralNetworkService.NeuralNetwork, entries: Array<NeuralNetworkService.Character>): Array<NeuralNetworkService.Guess> {
        var guesses: Array<NeuralNetworkService.Guess> = [];

        for (var i = 0; i < neuralNetwork.outputNodesTotal; i++)
        {
            guesses.push(new NeuralNetworkService.Guess(i));
        }

        entries.forEach((entry, i) => {
            this.testEntry(neuralNetwork, entry, guesses);
        });
        
        console.log(guesses);

        this.calculateMetrics(neuralNetwork);

        return guesses;
    }

    private testEntry(neuralNetwork: NeuralNetworkService.NeuralNetwork, entry: NeuralNetworkService.Character, guesses: Array<NeuralNetworkService.Guess>): void {
        this.resetNodes(neuralNetwork);

        var currentInput = this.characteres.findIndex(c => c.code == entry.code);

        this.populateInputNodes(neuralNetwork, entry.bits);

        this.calculateMiddleLayer(neuralNetwork);

        this.calculateOutputLayer(neuralNetwork);

        var outputLayerOrderedByOut = Object.assign([], neuralNetwork.outputNodes).sort((a, b) => {
            if (a.out > b.out) {
                return 1;
            }
            if (a.out < b.out) {
                return -1;
            }
            return 0;
        });

        var indexOfOutputWithHighestOut = neuralNetwork.outputNodes.findIndex(o => o.out == outputLayerOrderedByOut[outputLayerOrderedByOut.length - 1].out);

        if(currentInput < 0){
            guesses[indexOfOutputWithHighestOut].expectedValues.push(currentInput);
            let additionalIndex = this.characteresAdditional.findIndex(c => c.code == entry.code);

            console.log("Resultado " + this.characteres[indexOfOutputWithHighestOut].name +", esperado " + this.characteresAdditional[additionalIndex].name);
        }
        else if (indexOfOutputWithHighestOut != currentInput){
            guesses[currentInput].expectedValues.push(indexOfOutputWithHighestOut);
            console.log("Resultado " + this.characteres[indexOfOutputWithHighestOut].name +", esperado " + this.characteres[currentInput].name);
        }

        if(currentInput < 0){
            guesses[indexOfOutputWithHighestOut].wrongGuess++;
        }
        else{
            neuralNetwork.confusionMatrix.data[indexOfOutputWithHighestOut][currentInput]++;

            if (indexOfOutputWithHighestOut == currentInput)
            {
                guesses[currentInput].rightGuess++;
            }
            else
            {                    
                guesses[currentInput].wrongGuess++;
            }
        }  
    }

    public trainNetwork(neuralNetwork: NeuralNetworkService.NeuralNetwork, entries: Array<NeuralNetworkService.Character>, loopTimes: number = 1000): void {
        for (var i = 1; i < loopTimes + 1; i++) {
            console.log('Loop - ', i);
            
            entries.forEach((entry) => {
                let index = this.characteres.findIndex(c => c.code == entry.code);

                this.resetNodes(neuralNetwork);

                this.populateInputNodes(neuralNetwork, entry.bits);

                this.calculateMiddleLayer(neuralNetwork);

                this.calculateOutputLayer(neuralNetwork);

                this.calculateErrorOutputLayer(neuralNetwork, index);

                this.calculateErrorMiddleLayer(neuralNetwork);

                this.ajustNetworkWeights(neuralNetwork);
            });

            if (i % 20 == 0){
                let output, error, value;
                output = error = value = 0;
                for (let j = 0; j < neuralNetwork.outputNodesTotal; j++)
                {
                    output += neuralNetwork.outputNodes[j].out;
                    error += neuralNetwork.outputNodes[j].error;
                    value += neuralNetwork.outputNodes[j].value;
                }

                console.log("OUT: " + output / neuralNetwork.outputNodesTotal, "ERROR: " + error / neuralNetwork.outputNodesTotal, "VALUE: " + value / neuralNetwork.outputNodesTotal);
            }
        }
    }

    private resetNodes(neuralNetwork: NeuralNetworkService.NeuralNetwork): void{
        neuralNetwork.hideNodes = [];
        neuralNetwork.outputNodes = [];

        for (let i = 0; i < neuralNetwork.hideNodesTotal; i++){
            neuralNetwork.hideNodes.push(new NeuralNetworkService.Neuron());
        }

        for (let i = 0; i < neuralNetwork.outputNodesTotal; i++){
            neuralNetwork.outputNodes.push(new NeuralNetworkService.Neuron());
        }
    }

    private calculateMiddleLayer(neuralNetwork: NeuralNetworkService.NeuralNetwork): void{
        for (var i = 0; i < neuralNetwork.hideNodesTotal; i++)
        {
            let value = 0;
            for (var j = 0; j < neuralNetwork.inputNodesTotal; j++){
                value = value + neuralNetwork.inputNodes[j].out * neuralNetwork.weigthsInputForHide.data[i][j];
            }

            neuralNetwork.hideNodes[i] = new NeuralNetworkService.Neuron(value, false);
        }
    }

    private calculateOutputLayer(neuralNetwork: NeuralNetworkService.NeuralNetwork): void{
        for (var i = 0; i < neuralNetwork.outputNodesTotal; i++)
        {
            let value = 0;
            for (var j = 0; j < neuralNetwork.hideNodesTotal; j++){
                value = value + neuralNetwork.hideNodes[j].out * neuralNetwork.weigthsHideForOutput.data[i][j];
            }

            neuralNetwork.outputNodes[i] = new NeuralNetworkService.Neuron(value, false);
        }
    }

    private calculateErrorOutputLayer(neuralNetwork: NeuralNetworkService.NeuralNetwork, resultExpected: number): void {
        for (var i = 0; i < neuralNetwork.outputNodesTotal; i++) {
            if (resultExpected == i){
                neuralNetwork.outputNodes[i].error = neuralNetwork.outputNodes[i].out * (1 - neuralNetwork.outputNodes[i].out) * (1 - neuralNetwork.outputNodes[i].out);
            }
            else{
                neuralNetwork.outputNodes[i].error = neuralNetwork.outputNodes[i].out * (1 - neuralNetwork.outputNodes[i].out) * (0 - neuralNetwork.outputNodes[i].out);
            }
        }
    }

    private calculateErrorMiddleLayer(neuralNetwork: NeuralNetworkService.NeuralNetwork): void {
        for (var i = 0; i < neuralNetwork.hideNodesTotal; i++)
        {
            let erroFactor = 0;

            for (var j = 0; j < neuralNetwork.outputNodesTotal; j++){
                erroFactor = erroFactor + neuralNetwork.outputNodes[j].error * neuralNetwork.weigthsHideForOutput.data[j][i];
            }

            neuralNetwork.hideNodes[i].error = neuralNetwork.hideNodes[i].out * (1 - neuralNetwork.hideNodes[i].out) * erroFactor;
        }
    }

    private ajustNetworkWeights(neuralNetwork: NeuralNetworkService.NeuralNetwork): void{
        for (var i = 0; i < neuralNetwork.outputNodesTotal; i++){
            for (var j = 0; j < neuralNetwork.hideNodesTotal; j++){
                neuralNetwork.weigthsHideForOutput.data[i][j] = neuralNetwork.weigthsHideForOutput.data[i][j] + neuralNetwork.learningRate * neuralNetwork.hideNodes[j].out * neuralNetwork.outputNodes[i].error;
            }
        }
            
        for (var i = 0; i < neuralNetwork.hideNodesTotal; i++) {
            for (var j = 0; j < neuralNetwork.inputNodesTotal; j++){
                neuralNetwork.weigthsInputForHide.data[i][j] = neuralNetwork.weigthsInputForHide.data[i][j] + neuralNetwork.learningRate * neuralNetwork.inputNodes[j].out * neuralNetwork.hideNodes[i].error;
            }
        }
    }

    private populateInputNodes(neuralNetwork: NeuralNetworkService.NeuralNetwork, bits: Array<number>): void {
        neuralNetwork.inputNodes = [];

        for (var i = 0; i < neuralNetwork.inputNodesTotal; i++) {
            neuralNetwork.inputNodes.push(new NeuralNetworkService.Neuron(bits[i], true));
        }
    }

    public calculateMetrics(neuralNetwork: NeuralNetworkService.NeuralNetwork): void {
        for (let i = 0; i < neuralNetwork.outputNodesTotal; i++)
        {
            for (let j = 0; j < neuralNetwork.outputNodesTotal; j++)
            {
                if (i == j)
                {
                    neuralNetwork.truePositive += neuralNetwork.confusionMatrix.data[i][j];
                    for (let k = 0; k < neuralNetwork.outputNodesTotal; k++)
                    {
                        if (k != i) { 
                            neuralNetwork.trueNegative += neuralNetwork.confusionMatrix.data[i][j];
                        }
                    }
                }
                else
                {
                    neuralNetwork.falseNegative += neuralNetwork.confusionMatrix.data[i][j];
                    neuralNetwork.falsePositive += neuralNetwork.confusionMatrix.data[j][i];
                }
            }
        }

        neuralNetwork.acuracy = (neuralNetwork.truePositive + neuralNetwork.trueNegative) / (neuralNetwork.truePositive + neuralNetwork.falsePositive + neuralNetwork.trueNegative + neuralNetwork.falseNegative);

        neuralNetwork.error = 1 - neuralNetwork.acuracy;
        neuralNetwork.recall = neuralNetwork.truePositive / (neuralNetwork.truePositive + neuralNetwork.falseNegative);
        neuralNetwork.precision = neuralNetwork.truePositive / (neuralNetwork.truePositive + neuralNetwork.falsePositive);
        neuralNetwork.especify = neuralNetwork.trueNegative / (neuralNetwork.trueNegative + neuralNetwork.falsePositive);
        neuralNetwork.fmeasure = 2 * (neuralNetwork.recall * neuralNetwork.precision) / (neuralNetwork.recall + neuralNetwork.precision);

        console.log(`"accuracy: ${neuralNetwork.acuracy} error: ${neuralNetwork.error} recall: ${neuralNetwork.recall} precision: ${neuralNetwork.precision} especify: ${neuralNetwork.especify} fmeasure: ${neuralNetwork.fmeasure}"`);

        neuralNetwork.finish = true;
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
        if (value < 0.04) return 0;
        if (value > 0.98) return 1;

        return value;
    }
}

export namespace NeuralNetworkService {
    export class NeuralNetwork {
        public inputNodes: Array<Neuron>;
        public hideNodes: Array<Neuron>;
        public outputNodes: Array<Neuron>;
        public inputNodesTotal: number;
        public hideNodesTotal: number;
        public outputNodesTotal: number;
        public learningRate: number;
        public biasInputForHide: MatrixService.Matrix;
        public biasHideForOutput: MatrixService.Matrix;
        public weigthsInputForHide: MatrixService.Matrix;
        public weigthsHideForOutput: MatrixService.Matrix;
        public truePositive: number;
        public trueNegative: number;
        public falsePositive: number;
        public falseNegative: number;
        public confusionMatrix: MatrixService.Matrix;
        public acuracy: number = 0;
        public error: number = 0;
        public recall: number = 0;
        public precision: number = 0;
        public especify: number = 0;
        public fmeasure: number = 0;
        public finish: boolean = false;

        constructor(inputNodesTotal: number, hideNodesTotal: number, outputNodesTotal: number, learningRate: number) {
            this.inputNodes = [];
            this.hideNodes = [];
            this.outputNodes = [];
            this.inputNodesTotal = inputNodesTotal;
            this.hideNodesTotal = hideNodesTotal;
            this.outputNodesTotal = outputNodesTotal;

            for (let i = 0; i < inputNodesTotal; i++){
                this.inputNodes.push(new Neuron());
            }

            for (let i = 0; i < hideNodesTotal; i++){
                this.hideNodes.push(new Neuron());
            }

            for (let i = 0; i < outputNodesTotal; i++){
                this.outputNodes.push(new Neuron());
            }
            
            this.learningRate = learningRate;

            // this.biasInputForHide = new MatrixService.Matrix(this.hideNodes, 1);
            // this.biasHideForOutput = new MatrixService.Matrix(this.outputNodes, 1);

            // this.biasInputForHide.randomize();
            // this.biasHideForOutput.randomize();

            this.weigthsInputForHide = new MatrixService.Matrix(this.hideNodesTotal, this.inputNodesTotal);
            this.weigthsHideForOutput = new MatrixService.Matrix(this.outputNodesTotal, this.hideNodesTotal);

            this.weigthsInputForHide.randomize();
            this.weigthsHideForOutput.randomize();

            this.truePositive = 0;
            this.trueNegative = 0;
            this.falsePositive = 0;
            this.falseNegative = 0;
            this.confusionMatrix = new MatrixService.Matrix(this.outputNodesTotal, this.outputNodesTotal, true);
        }
    }

    export class Character {
        public name: string;
        public stringBits: string;
        public bits?: Array<number>;
        public code: number;
        public active?: boolean;
    }

    export class Neuron{
        public value: number;
        public out: number;
        public error: number;

        constructor(value?: number, firstLayer?: boolean){
            if(value != null){
                this.value = value;
                
                if (firstLayer){
                    this.out = value;
                } 
                else{
                    this.out = 1 / (1 + Math.exp(-value));
                }
                    
                this.error = 0;
            }
        }
    }

    export class Guess
    {
        public inputValue: InputEnum;
        public rightGuess: number = 0;
        public wrongGuess: number = 0;
        public expectedValues: Array<InputEnum>;

        constructor(inputValue: InputEnum){
            this.inputValue = inputValue;
            this.expectedValues = [];
        }
    }

    export enum InputEnum
    {
        Number0,
        Number1,
        Number2,
        Number3,
        Number4,
        Number5,
        Number6,
        Number7,
        Number8,
        Number9,
        LetterA,
        LetterB,
        LetterC,
        LetterD,
        LetterE,
        LetterF,
        LetterG,
        LetterH,
        LetterI,
        LetterJ,
        LetterK,
        LetterL,
        LetterM,
        LetterN,
        LetterO,
        LetterP,
        LetterQ,
        LetterR,
        LetterS,
        LetterT,
        LetterU,
        LetterV,
        LetterW,
        LetterX,
        LetterY,
        LetterZ,
    }
}