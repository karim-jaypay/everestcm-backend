'use strict';

/**
 * home router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

//module.exports = createCoreRouter('api::home.home');


module.exports = createCoreRouter('api::home.home', {
    prefix: '',
    only: ['find'],
    except: [],
    config: {
      find: {
        auth: false,
        policies: [],
        middlewares: [],
      },
      findOne: {},
      create: {},
      update: {},
      delete: {},
    },
  });