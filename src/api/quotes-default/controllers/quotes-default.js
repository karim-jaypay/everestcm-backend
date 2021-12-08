'use strict';

/**
 *  quotes-default controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::quotes-default.quotes-default');
