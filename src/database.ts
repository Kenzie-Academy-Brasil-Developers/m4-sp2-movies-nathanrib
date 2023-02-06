import { Client } from "pg";

const client: Client = new Client({
  user: "nathan",
  password: "alot",
  host: "localhost",
  database: "m4_sp2_movies",
  port: 5432,
});

const startDataBase = async (): Promise<void> => {
  await client.connect();
  console.log("Database is connected");
};

export { client, startDataBase };
