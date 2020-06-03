import { gql } from "apollo-boost";

export const HOME_PAGE = gql`
    {
        movies(limit:50 rating:9) {
            id
            title
            genres
            rating
        } 
    }`;

export const MOVIE_DETAILS = gql`
    query getMovieDetails(&movieId: Int!){
        movie(id: $movieId){
            medium_cover_image
            title
            rating
            description_intro
            language
            genres
        }
        suggestions(id: $movieId){
            medium_cover_image
            title
            rating
        }
    }
`;