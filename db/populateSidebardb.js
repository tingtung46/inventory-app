#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const categoriesSQL = `
CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category VARCHAR (255)
);

INSERT INTO categories (category)
VALUES 
  ('Footwear'),
  ('Climbing'),
  ('Bags'),
  ('Trekking'),
  ('Jackets'),
  ('Navigation'),
  ('Cycling');
`;

const brandsSQL = `
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  brand VARCHAR (255)
);

INSERT INTO brands (brand)
VALUES 
  ('WildRunner'),
  ('Zephyr'),
  ('Green Equipment'),
  ('Daybird'),
  ('Gravitator'),
  ('Raptor Elite'),
  ('Solstix');
`;

async function categories() {
  console.log("seeding categories...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
  });
  await client.connect();
  await client.query(categoriesSQL);
  await client.end();
  console.log("done");
}

async function brands() {
  console.log("seeding brands...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
  });
  await client.connect();
  await client.query(brandsSQL);
  await client.end();
  console.log("done");
}

categories();
brands();
