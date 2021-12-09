'use strict';

/**
 * metal service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::metal.metal');
