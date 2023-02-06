import { Request, Response, NextFunction } from "express";
import { QueryConfig } from "pg";
import { client } from "./database";
import { MovieResult } from "./interfaces";

const ensuranceMovieExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id: number = parseInt(req.params.id);
  const queryString: string = `
        SELECT * FROM movies WHERE id = $1;
    `;
  const queryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: MovieResult = await client.query(queryConfig);
  if (!queryResult.rowCount) {
    res.status(404).json({
      message: "id not found",
    });
  }

  return next();
};

export { ensuranceMovieExists };
