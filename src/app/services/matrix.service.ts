import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatrixService {
    constructor() { }

    public sum(m1: MatrixService.Matrix, m2: MatrixService.Matrix): MatrixService.Matrix {
        const matrix = new MatrixService.Matrix(m1.rows, m1.columns);

        matrix.onMap((value, i, j) => {
            return m1.data[i][j] + m2.data[i][j];
        });

        return matrix;
    }

    public multiply(m1: MatrixService.Matrix, m2: MatrixService.Matrix): MatrixService.Matrix {
        const matrix = new MatrixService.Matrix(m1.rows, m2.columns);

        matrix.onMap((value, i, j) => {
            let sum = 0;

            for(let k = 0; k < m2.rows; k++){
                let elm1 = m1.data[i][k];
                let elm2 = m2.data[k][j];

                sum += elm1 * elm2;
            }

            return sum;
        });

        return matrix;
    }
}

export namespace MatrixService {
    export class Matrix {
        public rows: number;
        public columns: number;
        public data: Array<any> = [];

        constructor(rows:number, columns: number){
            this.rows = rows;
            this.columns = columns;

            for(let i = 0; i < rows; i++){
                let arr = [];

                for(let j = 0; j < columns; j++){
                    arr.push(Math.floor(Math.random()*10));
                }

                this.data.push(arr);
            }
        }

        public onMap(callback: (value: number, i: number, j: number) => void): Matrix {
            this.data = this.data.map((m, i) => {
                return m.map((value, j) => {
                    return callback(value, i, j);
                });
            });
    
            return this;
        }
    }
}