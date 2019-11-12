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

            for (let k = 0; k < m1.columns; k++) {
                let elm1 = m1.data[i][k];
                let elm2 = m2.data[k][j];

                sum += elm1 * elm2;
            }

            return sum;
        });

        return matrix;
    }

    public arrayToMatrix(arr: Array<number>): MatrixService.Matrix {
        let matrix = new MatrixService.Matrix(arr.length, 1);

        matrix.onMap((value, i, j) => {
            return arr[i];
        })
        
        return matrix;
    }

    public onMap(matrix: MatrixService.Matrix, callback: (value: number, i: number, j: number) => void): MatrixService.Matrix {
        let newMatrix = new MatrixService.Matrix(matrix.rows, matrix.columns);
        
        newMatrix.data = newMatrix.data.map((m, i) => {
            return m.map((value, j) => {
                return callback(value, i, j);
            });
        });

        return newMatrix;
    }
}

export namespace MatrixService {
    export class Matrix {
        public rows: number;
        public columns: number;
        public data: Array<any> = [];

        constructor(rows: number, columns: number) {
            this.rows = rows;
            this.columns = columns;

            for (let i = 0; i < rows; i++) {
                let arr = [];

                for (let j = 0; j < columns; j++) {
                    arr.push(Math.floor(Math.random() * 10));
                }

                this.data.push(arr);
            }
        }

        public print(): void {
            console.table(this.data);
        }

        public randomize(): void {
            this.onMap((value, i, j) => {
                return Math.random() * 2 - 1;
            })
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