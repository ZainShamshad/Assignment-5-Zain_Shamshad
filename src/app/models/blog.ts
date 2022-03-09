import { User } from "./user";

export class Blog {

    private id: number = 0;
    private title: string= '';
    private date: string= '';
    private description: string= '';
    private imagePath: string= '';
    private creator: User= new User();
    public expanded: boolean = false;

    constructor(id?:number, title?:string, date?:string, description?:string, imagepath?:string, creator?:User){

        if(id !== undefined){
            this.id = id;
        }

        if(title !== undefined){
            this.title = title;
        }

        if(date !== undefined){
            this.date = date;
        }

        if(description !== undefined){
            this.description = description;
        }

        if(imagepath !== undefined ){
            this.imagePath = this.imagePath;
        }

        if(creator !== undefined){
            this.creator = creator;
        }
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getDate(): string {
        return this.date;
    }

    public setDate(date: string): void {
        this.date = date;
    }

    
    public getDescription(): string {
        return this.description;
    }

    public setDescription(description: string): void {
        this.description = description;
    }

    
    public getImagePath(): string {
        return this.imagePath;
    }

    public setImagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }

    public getCreator(): User {
        return this.creator;
    }

    public setCreator(creator: User): void {
        this.creator = creator;
    }



}
