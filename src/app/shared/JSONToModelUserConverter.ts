import { User } from "../models/user";

export class JSONToModelUserConverter {
    public static convert(data:any): User[] {
        if(data === undefined || data === null || data.length<=0) {
            return [];
        }

        let users: User[] = [];

        for(const user of data){
            users.push(
                new User(
                    user.id,
                    user.firstname,
                    user.lastname,
                    user.username,
                    user.email,
                    user.password,
                    user.role,
                    user.designation,
                    user.imagePath,
                    user.blocked,
                    user.flagged
                )
            );
        }
        return users;
    }
}