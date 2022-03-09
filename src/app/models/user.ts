export class User {

    private id:number = 0;
    public loginAttemptsFailed:number = 0;
    public FLAG_LIMIT: number;
    private firstname:string = '';
    private lastname:string = '';
    private username:string = '';
    private email:string = '';
    private password:string = '';
    private role:string = '';
    private designation:string = '';
    private imagePath:string = '';
    private blocked:boolean = false;

    constructor(id?:number,firstname?:string,lastname?:string,username?:string,email?:string,password?:string,role?:string,designation?:string,imagePath?:string,blocked?:boolean,flagged?:number){
        
        this.FLAG_LIMIT = 3;

        if( id !== undefined ){
            this.id = id;
        }

        if( firstname !== undefined ){
            this.firstname = firstname;
        }

        if( lastname !== undefined ){
            this.lastname = lastname;
        }

        if( username !== undefined ){
            this.username = username;
        }

        if( email!== undefined ){
            this.email = email;
        }

        if( password!== undefined ){
            this.password =password ;
        }

        if( role !== undefined ){
            this.role = role;
        }

        if( designation!== undefined ){
            this.designation = designation;
        }
        
        if( imagePath!== undefined ){
            this.imagePath =imagePath ;
        }

        if( blocked !== undefined ){
            this.blocked = blocked;
        }
        
        if( flagged !== undefined ){
            this.loginAttemptsFailed = flagged;
        }
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getUsername(): string {
        return this.username;
    }
    public setUsername(username: string): void {
        this.username = username;
    }

    public getFirstname(): string {
        return this.firstname;
    }

    public setFirstname(firstname: string): void {
        this.firstname = firstname;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setlastname(lastname: string): void {
        this.lastname = lastname;
    }


    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }
    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }

    public getDesignation(): string {
        return this.designation;
    }

    public setDesignation(designation: string): void {
        this.designation = designation;
    }

    public getimagePath(): string {
        return this.imagePath;
    }

    public setimagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }

    public getBlocked():boolean{
        return this.blocked;
    }
    
    public setBlocked(blocked: boolean): void {
        this.blocked = blocked;
    }

}
