'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const user = app.model.define(
    'user',
    {
      UserName: STRING,
      Pwd: STRING,
      Email: STRING,
      UserType: INTEGER,
    },
    {
      underscored: false,
    }
  );
  // user.associate = function(models) {
  //   // associations can be defined here
  // };
  return user;
};
