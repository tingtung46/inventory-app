const { Router } = require("express");
const indexRouter = Router();
const itemController = require("../controllers/itemController");

indexRouter.get("/", itemController.itemListGet);

indexRouter.get("/new", itemController.addItemGet);
indexRouter.post("/new", itemController.addItemPost);

indexRouter.get("/update", itemController.updateItemGet);
indexRouter.post("/update", itemController.updateItemPost);

indexRouter.get("/search", itemController.searchItemGet);

indexRouter.post("/:id/delete", itemController.deleteItem);

indexRouter.get("/:param", itemController.filterItemsGet);

module.exports = indexRouter;
