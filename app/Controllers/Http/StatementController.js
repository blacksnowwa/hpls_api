"use strict";
const Statement = use("App/Models/Statement");

class StatementController {
  async saveall({ request, view, response, auth }) {
    var item = request.all();
    var i = 0;
    await Statement.query()
      .where("date", item[i].date)
      .where("username", item[i].username)
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
      .where("username", item[0].username).fetch()
    // var username = item[0].username

    // var i = 0
    // for(i in item){
    //  await Config.create({
    //      username:item[i].username,
    //      itemId:item[i].itemId,
    //  })
    // }

    // return await Config.all()
  }
  async getall({ request, view, response, auth }) {
    const obj = [];
    const data = Statement.query().select('date','username','send').orderBy("date", "user", "desc").fetch()
  

    return data;
  }
}

module.exports = StatementController;
