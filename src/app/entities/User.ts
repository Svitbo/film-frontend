import { Movie } from "./Movie";

export interface User {
    id : number;
    username : string;
    role : string;
    favorite_movies : Movie[];
}