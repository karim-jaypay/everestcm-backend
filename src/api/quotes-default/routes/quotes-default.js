'use strict';

/**
 * quotes-default router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::quotes-default.quotes-default');
