const db = require("../db/query");

const itemListGet = async (req, res) => {
  const items = await db.getAllItems();
  res.render("index", { items });
};

const addItemGet = (req, res) => {
  res.render("form");
};

const addItemPost = async (req, res) => {
  const { item, brand, category, price } = req.body;
  await db.addItem(item, brand, category, price);

  res.redirect("/");
};

const updateItemGet = async (req, res) => {
  const { id } = req.params;
  const item = await db.getItem(id);

  res.render("updateItem", { item: item[0] });
};

const updateItemPost = async (req, res) => {
  const { id } = req.params;
  const { item, brand, category, price } = req.body;
  await db.updateItem(item, brand, category, price, id);

  res.redirect("/");
};

const searchItemGet = async (req, res) => {
  const keyword = req.query.keyword;
  const searchResult = await db.searchItem(keyword);

  res.render("search", { title: "Search Result", items: searchResult });
};

const deleteItem = async (req, res) => {
  const id = req.params.id;
  await db.deleteItem(id);

  res.redirect("/");
};

module.exports = {
  itemListGet,
  addItemGet,
  addItemPost,
  updateItemGet,
  updateItemPost,
  searchItemGet,
};
