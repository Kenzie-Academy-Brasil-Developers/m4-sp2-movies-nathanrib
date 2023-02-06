import { QueryResult } from "pg";

interface IMovieRequest {
  moviename: "string";
  description: "string";
  duration: boolean;
  price: number;
}

interface IMovie extends IMovieRequest {
  id: number;
}

type MovieResult = QueryResult<IMovie>;
type MovieCreate = Omit<IMovie, "id">;

export { IMovieRequest, IMovie, MovieResult, MovieCreate };
