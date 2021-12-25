import busboy from "busboy";
import fs from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import db from "../config/index.js";

import { readFile } from "fs/promises";

class Router {
  async post(request, response) {
    const bb = busboy({ headers: request.headers });

    let obj = {};
    bb.on("field", (fieldName, value) => (obj[fieldName] = value));
    bb.on("file", async (name, file, info) => {
      const { filename } = info;
      const __dirname = dirname(fileURLToPath(import.meta.url));

      let path = resolve(__dirname, "../", "upload");
      const date = Date.now().toString();
      path = `${path}/${date + filename}`;

      obj["filename"] = filename;
      obj["path"] = path;
      file.pipe(fs.createWriteStream(path));
    });

    bb.on("finish", async () => {
      const book = await db("books").insert({
        title: obj["title"],
        Author: obj["Author"],
        title: obj["gender"],
      });

      const idBook = book[0];

      const file = await db("file").insert({
        name: obj["filename"],
        path: obj["path"],
        books_id: idBook,
      });
    });

    request.pipe(bb);
  }

  async get(request, response) {
    const __dirname = dirname(fileURLToPath(import.meta.url));

    let path = resolve(__dirname, "../", "web");
    const content = await readFile(`${path}/books/build/index.html`);
    response.write(content.toString());
    return response.end();
  }

  handler(request, response) {
    const chosen = this[request.method.toLowerCase()];

    return chosen.apply(this, [request, response]);
  }
}

export default Router;
