#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const SQL = `
CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  item VARCHAR (255),
  brand VARCHAR (255),
  category VARCHAR (255),
  price VARCHAR (255)
);

INSERT INTO products (item, brand, category, price)
VALUES 
  ('Wanderer Black Hiking Boots', 'Daybird', 'Footwear', '109.99'),
  ('Summit Pro Harness', 'Gravitator', 'Climbing', '89.99'),
  ('Expedition Backpack', 'Quester', 'Bags', '129.99');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
