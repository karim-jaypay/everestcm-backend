'use strict';

/**
 *  energy controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::energy.energy');
