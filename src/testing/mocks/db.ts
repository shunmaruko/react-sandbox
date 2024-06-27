import { factory, primaryKey } from "@mswjs/data";
import { nanoid } from "nanoid";

const models = {
  user: {
    id: primaryKey(nanoid),
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
    createdAt: Date.now,
  },
};

export const db = factory(models);

export type Model = keyof typeof models;

export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

export const saveDb = (model: Model) => {
  const data = loadDb();
  data[model] = db[model].getAll();
  window.localStorage.setItem("msw-db", JSON.stringify(data));
};

export const resetDb = () => {
  window.localStorage.removeItem("msw-db");
};

export const initializeDb = () => {
  const database = loadDb();
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};
