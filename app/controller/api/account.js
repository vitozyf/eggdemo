'use strict';

const Controller = require('egg').Controller;

class AccountController extends Controller {
  async register() {
    const { ctx, service } = this;
    const createRule = {
      user_name: { type: 'string', required: true },
      password: { type: 'string', required: true },
      mobile: { type: 'string', required: false },
      gender: { type: 'enum', values: ['0', '1', '2'], required: false },
      open_id: { type: 'string', required: false },
    };
    try {
      // 校验参数
      ctx.validate(createRule);
    } catch (err) {
      return (ctx.body = {
        Code: 2,
        Data: '参数错误',
      });
    }

    const { user_name, password, mobile, gender, open_id } = ctx.request.body;
    const user = await service.account.getUserByUserName(user_name);
    if (!user) {
      const account = await service.account.addAccount({
        user_name,
        password,
        mobile,
        gender,
        open_id,
      });
      if (account) {
        return (ctx.body = {
          Code: 0,
          Data: '注册成功',
        });
      }
      return (ctx.body = {
        Code: 0,
        Data: '注册失败',
      });
    }
    ctx.body = {
      Code: 1,
      Data: '用户已存在',
    };
  }
}

module.exports = AccountController;
