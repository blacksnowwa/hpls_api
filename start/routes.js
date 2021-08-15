"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "WELCOME TO HONG PAA LOGISTIC SYSTEM API BY AOM_ZZZ" };
});

//User routes
Route.group(() => {
  Route.get("", "UserController.getall");
  Route.post("create", "UserController.create");

  Route.route("get", "UserController.fetch", ["GET", "POST"]);
}).prefix("user");
Route.group(() => {
  Route.post("login", "Auth/AuthenticationController.login");
  Route.post("register", "Auth/AuthenticationController.register");
  Route.get("me", "Auth/AuthenticationController.me").middleware(["auth"]);
}).prefix("api");
Route.get("api/daily", "DialyController.getDialy");
Route.get("api/daily/:id", "DialyController.getDialy");

Route.group(() => {
  Route.get("", "ItemController.getitem");
  Route.post("create", "ItemController.create");
  Route.post("update", "ItemController.update");
  Route.post("delete", "ItemController.delete");
  Route.post("/:name", "ItemController.createByParams");
  Route.get("/loop", "ItemController.loop");
}).prefix("api/items");
Route.group(() => {
  Route.get("", "StatementController.getall");
  Route.post("saveall", "StatementController.saveall");
  Route.get("all", "StatementController.all");
  Route.get("report", "StatementController.report");
}).prefix("api/statement");
Route.group(() => {
  Route.get("/:username", "ConfigController.getConfig");
  Route.post("create", "ConfigController.createConfig");
}).prefix("api/config");
