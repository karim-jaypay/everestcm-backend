'use strict';

/**
 * energy service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::energy.energy');
