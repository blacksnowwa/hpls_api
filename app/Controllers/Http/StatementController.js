"use strict";
const Statement = use("App/Models/Statement");
const Items = use("App/Models/Item");

class StatementController {
  async saveall({ request, view, response, auth }) {
    var item = request.all();
    var i = 0;
    var arr = [];
    for (i in item) {
      arr.push(item[i].item);
    }
    await Statement.query()
      .where("date", item[i].date)
      .where("username", item[i].username)
      .whereIn("item", arr)
      .delete();
    for (i in item) {
      await Statement.create({
        username: item[i].username,
        date: item[i].date,
        item: item[i].item,
        send: item[i].send,
        recive: item[i].recive,
        out: item[i].out,
      });
    }

    return Statement.query()
      .where("date", item[0].date)
      .where("username", item[0].username)
      .fetch();
  }
  async all({ request, view, response, auth }) {
    const obj = [];
    // const data = Statement.query().select('date','username','send').orderBy("date", "user", "desc").fetch()
    // const data = Statement.query()
    //   .select("date", "username", "item", "send", "recive", "out")
    //   .groupBy("username", "date")
    //   .orderBy("username")
    //   .fetch();
    const data = Statement.query()
      .select("date", "username", "item", "send", "recive", "out")
      .groupBy("date", "username")
      .orderBy("date", "desc")
      .sum("send as t_send")
      .sum("recive as t_recive");

    return data;
  }
  async report({ request, view, response, auth, params }) {
    const date = request.all().date;
    const data = Statement.query()
      .select("id", "date", "username", "item", "send", "recive", "out")
      .where("date", date)
      .groupBy("item")
      .orderBy("id", "desc")
      .sum("send as t_send")
      .sum("recive as t_recive");
    return data;
  }
  async getall({ request, view, response, auth }) {
    const obj = [];
    // const data = Statement.query().select('date','username','send').orderBy("date", "user", "desc").fetch()
    const data = Statement.query()
      .select("date", "username", "item", "send", "recive", "out")
      .orderBy("username")
      .fetch();

    return data;
  }
  async getDaily({ request, params, view, response, auth }) {
    const obj = Statement.query()
      .select("*")
      .where("username", params.username)
      .where("date", params.date)
      .fetch();
    const json = obj.toJSON();
    // var x = ["asd"];

    // var i = 0;
    // for (i in obj) {
    //   var item = await Items.query().where("Name", obj[i].item).fetch();
    //   var json = item.toJSON();
    //   obj[i].itemId = json[0].id;
    //   x.push(i);
    // }
    return json;
  }
}

module.exports = StatementController;
