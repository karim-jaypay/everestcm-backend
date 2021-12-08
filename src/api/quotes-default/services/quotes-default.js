'use strict';

/**
 * quotes-default service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::quotes-default.quotes-default');
