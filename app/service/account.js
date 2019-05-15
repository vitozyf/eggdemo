'use strict';

const Service = require('egg').Service;

class UserServer extends Service {
  /**
   * 增加账号
   * @param {Object} accountInfo 注册信息
   */
  async addAccount(accountInfo) {
    return this.ctx.model.Account.create(accountInfo);
  }
  /**
   * 根据账号名查找账号
   * @param {string} user_name  账号名
   */
  async getUserByUserName(user_name) {
    if (!user_name || user_name.length === 0) {
      return null;
    }

    return this.ctx.model.Account.findOne({
      where: { user_name },
      attributes: {
        exclude: ['Pwd'],
      },
    });
  }
}

module.exports = UserServer;
