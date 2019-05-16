'use strict';
module.exports = {
  /**
   * 返回数据方法
   * @param {number} Code 状态码
   * @param {any} Data 数据
   * @param {string} Message 提示信息
   */
  send(Code, Data, Message) {
    this.body = {
      Code,
      Data,
      Message,
    };
  },
};
