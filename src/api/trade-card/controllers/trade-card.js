'use strict';

/**
 *  trade-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::trade-card.trade-card');

module.exports = createCoreController('api::trade-card.trade-card', ({ strapi }) => ({
    async find(ctx) {
        const populateList = [
            'image'
        ]
        // Push any additional query params to the array
        populateList.push(ctx.query.populate)
        ctx.query.populate = populateList.join(',')

        const content = await super.find(ctx)
        return content
    }
}));
