'use strict';

/**
 * trade-card router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

//module.exports = createCoreRouter('api::trade-card.trade-card');

module.exports = createCoreRouter('api::trade-card.trade-card', {
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
