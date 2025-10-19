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

async function getBrands() {
  const { rows } = await pool.query("SELECT * FROM brands ORDER BY id ASC");
  return rows;
}

async function getCategories() {
  const { rows } = await pool.query("SELECT * FROM categories ORDER BY id ASC");
  return rows;
}

async function addBrand(brand) {
  await pool.query("INSERT INTO brands (brand) VALUES ($1)", [brand]);
}

async function addCategory(category) {
  await pool.query("INSERT INTO categories (category) VALUES ($1)", [category]);
}

async function deleteBrand(id) {
  await pool.query("DELETE FROM brands WHERE id = $1", [id]);
}

async function deleteCategory(id) {
  await pool.query("DELETE FROM categories WHERE id = $1", [id]);
}

async function getOther() {
  const { rows } = await pool.query(
    "SELECT P.* FROM products P LEFT JOIN categories C ON P.category = C.category LEFT JOIN brands B ON P.brand = B.brand WHERE C.category IS NULL OR B.brand IS NULL"
  );
  return rows;
}

module.exports = {
  getAllItems,
  filterItems,
  addItem,
  getItem,
  updateItem,
  searchItem,
  deleteItem,
  getBrands,
  getCategories,
  addBrand,
  addCategory,
  deleteBrand,
  deleteCategory,
  getOther,
};
