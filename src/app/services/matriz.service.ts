import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MatrizService {
    constructor() { }

}

export namespace MatrizService {
    export class Matriz {
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
    }
}