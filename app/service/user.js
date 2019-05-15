'use strict';

const Service = require('egg').Service;

class UserServer extends Service {
  async getUserByLoginName(UserName) {
    if (UserName.length === 0) {
      return null;
    }

    return this.ctx.model.User.findOne({
      where: { UserName },
      attributes: {
        exclude: ['Pwd'],
      },
    });
  }
}

module.exports = UserServer;
