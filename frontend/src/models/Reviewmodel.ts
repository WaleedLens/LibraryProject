class Reviewmodel{
    id:number;
    userEmail:string;
    reviewDescription:string;
    book_id:number;
    date:string;
    rating:number;


    constructor(id:number,userEmail:string,date:string,rating:number,book_id:number,reviewDescription:string){
        this.id=id;
        this.userEmail = userEmail;
        this.date = date;
        this.reviewDescription = reviewDescription;
        this.rating = rating;
        this.book_id = book_id;

    }
}



export default Reviewmodel;