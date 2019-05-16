'use strict';

const Controller = require('egg').Controller;
const md5 = require('blueimp-md5');
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
      ctx.logger.error(err);
      return ctx.send(2, null, '参数错误');
    }

    const { user_name, password, mobile, gender, open_id } = ctx.request.body;
    const user = await service.account.getUserByUserNameWithoutPwd(user_name);
    const md5_password = md5(password);
    if (user) {
      return ctx.send(1, null, '用户已存在');
    }
    const account = await service.account.addAccount({
      user_name,
      password: md5_password,
      mobile,
      gender,
      open_id,
    });
    if (account) {
      const accountres = await service.account.getUserByUserNameWithoutPwd(
        user_name
      );
      return ctx.send(0, accountres, '注册成功');
    }
    return ctx.send(2, null, '注册失败');
  }

  async login() {
    const { ctx, service } = this;
    const createRule = {
      user_name: { type: 'string', required: true },
      password: { type: 'string', required: true },
    };
    try {
      // 校验参数
      ctx.validate(createRule);
    } catch (err) {
      ctx.logger.error(err);
      return ctx.send(2, null, '参数错误');
    }
    const { user_name, password } = ctx.request.body;
    const user = await service.account.getUserByUserName(user_name);
    if (!user) {
      return ctx.send(1, null, '没有找到用户名');
    }
    if (user.password !== md5(password)) {
      return ctx.send(2, null, '密码错误');
    }
    const userinfo = await service.account.getUserByUserNameWithoutPwd(
      user_name
    );
    return ctx.send(0, userinfo, '登录成功');
  }
}

module.exports = AccountController;
