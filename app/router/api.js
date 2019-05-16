'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const apiV1Router = app.router.namespace('/api/v1');
  const { controller } = app;

  const { account } = controller.api;
  apiV1Router.post('/register', account.register);
  apiV1Router.post('/login', account.login);
};
