'use strict';

/**
 * forex service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::forex.forex');
