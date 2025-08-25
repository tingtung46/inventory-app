const pool = require("./pool");

async function getAllItems() {
  const { rows } = await pool.query("SELECT * FROM products ORDER BY id ASC");
  return rows;
}

async function filterItems(param) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE brand = $1 OR category = $1",
    [param]
  );
  return rows;
}

async function addItem(item, brand, category, price) {
  await pool.query(
    "INSERT INTO products (item, brand, category, price) VALUES ($1, $2, $3, $4)",
    [item, brand, category, price]
  );
}

async function getItem(id) {
  const { rows } = await pool.query("SELECT * FROM products WHERE id = $1", [
    id,
  ]);
  return rows;
}

async function updateItem(item, brand, category, price, id) {
  await pool.query(
    "UPDATE products SET item = $1, brand = $2, category = $3, price = $4 WHERE id = $5",
    [item, brand, category, price, id]
  );
}

async function searchItem(keyword) {
  const { rows } = await pool.query(
    "SELECT * FROM products WHERE item = $1 OR brand = $1 OR category = $1",
    [`%${keyword}%`]
  );

  return rows;
}

async function deleteItem(id) {
  await pool.query("DELETE FROM products WHERE id = $1", [id]);
}

module.exports = {
  getAllItems,
  filterItems,
  addItem,
  getItem,
  updateItem,
  searchItem,
  deleteItem,
};
