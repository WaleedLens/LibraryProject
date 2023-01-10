export class TodoModule{
    rowNumber:number;
    rowDescription:string;
    rowAuthor:string;

    constructor(rowNumber:number,rowDescription:string,rowAuthor:string){
        this.rowAuthor = rowAuthor;
        this.rowNumber = rowNumber;
        this.rowDescription = rowDescription;
    }
}