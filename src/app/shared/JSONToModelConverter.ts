import { Blog } from "../models/blog";
import { User } from "../models/user";

export class JSONToModelConverter {

    public static convert(data:any): Blog[] {

        if(data === undefined || data === null || data.length<=0){
            return [];
        }

        let blogs: Blog[] = [];

        for(const blog of data){
            blogs.push(
                new Blog(
                    blog.id,
                    blog.title,
                    blog.date,
                    blog.description,
                    blog.imagePath,
                    new User(
                        blog.creator.id,
                        blog.creator.firstname,
                        blog.creator.lastname,
                        blog.creator.username,
                        blog.creator.email,
                        blog.creator.password,
                        blog.creator.role,
                        blog.creator.designation,
                        blog.creator.imagePath,
                        blog.creator.blocked,
                        blog.creator.flagged
                    )
                )
            );
        }

        return blogs;
    }
}