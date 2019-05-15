'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = {
      Code: 0,
      Data: true,
    };
  }
}

module.exports = HomeController;
