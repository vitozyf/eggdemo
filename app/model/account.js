'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const account = app.model.define(
    'account',
    {
      user_name: STRING,
      password: STRING,
      mobile: STRING,
      gender: INTEGER,
      open_id: STRING,
    },
    {
      underscored: false,
    }
  );
  // account.associate = function(models) {
  //   // associations can be defined here
  // };
  return account;
};
