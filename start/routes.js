"use strict";

const Route = use("Route");

Route.get("/", () => {
  return { greeting: "WELCOME TO HONG PAA LOGISTIC SYSTEM API BY AOM_ZZZ" };
});

//User routes
Route.group(() => {
  Route.post("create", "UserController.create");

  Route.route("get", "UserController.fetch", ["GET", "POST"]);
}).prefix("user");