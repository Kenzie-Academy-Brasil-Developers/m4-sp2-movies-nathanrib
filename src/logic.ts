import { Request, Response } from "express";
import { QueryConfig } from "pg";
import format from "pg-format";
import { client } from "./database";
import { IMovie, IMovieRequest, MovieCreate, MovieResult } from "./interfaces";

const createMovie = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movieDataRequest: IMovieRequest = req.body;
    const movieData: MovieCreate = movieDataRequest;

    const queryString: string = format(
      `
    INSERT INTO movies(%I)
    VALUES  (%L)
    RETURNING *
    `,
      Object.keys(movieData),
      Object.values(movieData)
    );

    const queryResult: MovieResult = await client.query(queryString);
    const newWorkOrder: IMovie = queryResult.rows[0];
    return res.status(201).json(newWorkOrder);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(409).json({
        message: error.message,
      });
    }
    return res.status(500).json({
      message: "internal server error",
    });
  }
};
const readAllMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const per_page = req.query.per_page || 10;
  const page = req.query.page || 0;

  const queryString: string = `
    select * from movies
    LIMIT $1 OFFSET $2 ;  
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [per_page, page],
  };

  try {
    const queryResult = await client.query(queryConfig);
    return res.status(200).json(queryResult.rows);
  } catch (error) {
    return res.status(400).json(error);
  }
};
const deleteMovie = async (req: Request, res: Response): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  const queryString: string = `
     DELETE FROM movies WHERE id = $1;
 `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);
  return res.status(204).send();
};
const updateMovie = async (req: Request, res: Response): Promise<Response> => {

  try{ 
  const id: number = parseInt(req.params.id);
  const movieReqValues = Object.values(req.body);
  const movieReqKeys = Object.keys(req.body);

  const queryString: string = format(
    `
    UPDATE movies SET(%I) = ROW(%L) WHERE id = $1 RETURNING * ;
    `,
    movieReqKeys,
    movieReqValues
  );

  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };

  const queryResult: MovieResult = await client.query(queryConfig);
  return res.status(200).json(queryResult.rows[0]);
} 
catch (error) {
  if (error instanceof Error) {
    return res.status(409).json({
      message: error.message,
    });
  }
  return res.status(500).json({
    message: "internal server error",
  });
}

};

export { createMovie, readAllMovies, deleteMovie, updateMovie };
