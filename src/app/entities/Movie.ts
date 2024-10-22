export interface Movie {
    id : number ;
    title : string;
    genre : string;
    production_year : number;
    production_country : string;
    producer : string;
    duration_minutes : number;
    revenue : number;
    created_at : Date;
    description : string;
    //posterPath : string;
    //isAddedToFavorites : boolean;
}