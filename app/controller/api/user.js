'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async register() {
    const { ctx, service } = this;
    const { name } = ctx.request.body;
    const user = await service.user.addAccount(name);
    if (!user) {
      ctx.status = 404;
      ctx.message = '这个用户不存在。';
      return;
    }
    ctx.body = {
      Code: 0,
      Data: user,
    };
  }
}

module.exports = HomeController;
