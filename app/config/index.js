import knex from "knex";

const knexQuery = knex.knex({
  client: "sqlite3",
  connection: {
    filename: "./db.sqlite",
  },
  useNullAsDefault: true,
});

(async () => {
  const hasTableBook = await knexQuery.schema.hasTable("books");

  if (!hasTableBook) {
    await knexQuery.schema.createTable("books", (tableBuilder) => {
      tableBuilder.integer("id").primary();
      tableBuilder.string("title");
      tableBuilder.string("Author");
      tableBuilder.string("gender");
    });
  }

  const hasTableFile = await knexQuery.schema.hasTable("file");

  if (!hasTableFile) {
    await knexQuery.schema.createTable("file", (tableBuilder) => {
      tableBuilder.integer("id").primary();
      tableBuilder.string("name");
      tableBuilder.string("path");
      tableBuilder.integer("books_id").references("id").inTable("books");
    });
  }

  const books = await knexQuery
    .select("*")
    .from("books")
    .join("file", "books.id", "file.books_id");

  console.log(books);
})();

export default knexQuery;
