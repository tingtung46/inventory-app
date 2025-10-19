const db = require("../db/query");
const brand = [
  "Daybird",
  "Gravitator",
  "Quester",
  "Raptor Elite",
  "Grolltex",
  "Green Equipment",
];
const category = [
  "Footwear",
  "Climbing",
  "Bags",
  "Trekking",
  "Jackets",
  "Navigation",
  "Cycling",
];

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const itemListGet = async (req, res) => {
  const brands = await db.getBrands();
  const categories = await db.getCategories();
  const items = await db.getAllItems();
  res.render("index", { items, brands, categories });
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

  res.render("updateItem", {
    item: item[0],
    brands: brand,
    categories: category,
  });
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

const filterItemsGet = async (req, res) => {
  const keyword = capitalizeFirstLetter(req.params.param);
  const brands = await db.getBrands();
  const categories = await db.getCategories();

  //filter items based on params (brand/category or other)
  let items = await db.filterItems(keyword);

  if (!items.length && keyword === "Other") {
    items = await db.getOther();
  }

  res.render("index", { items, brands, categories });
};

module.exports = {
  itemListGet,
  addItemGet,
  addItemPost,
  updateItemGet,
  updateItemPost,
  searchItemGet,
  deleteItem,
  filterItemsGet,
};
