class Bookmodel {
    id:number;
    title:string;
    author?:string;
    description?:string;
    copies?:number;
    copiesAvailable?:number;
    category?:string;
    img?:string;

    constructor(id:number,title:string,author:string,description:string
        ,copies:number,copiesAvailable:number,category:string,img:string
        ){
            this.id = id;
            this.author = author;
            this.title = title;
            this.description = description;
            this.copies = copies;
            this.copiesAvailable = copiesAvailable;
            this.category = category;
            this.img = img;
        }



        

}



export default Bookmodel;