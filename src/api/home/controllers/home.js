'use strict';

/**
 *  home controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::home.home');

module.exports = createCoreController('api::home.home', ({ strapi }) => ({
    async find(ctx) {
        const populateList = [
            'HomeSlider',
            'HomeSlider.button',
            'HomeSlider.image',
            'HomeSlider.background',
            'second',
            'third',
            'third_card',
            'third_card.icon',
            'fourth',
            'fourth_image',
            'fourth_card',
            'fourth_card.icon',
            'fifth',
            'fifth_image',
            'sixth',
            'sixth_card',
            'sixth_card.icon',
            'seventh',
            'background',
            'seventh_image',
            'pay_icon',
            'pay_icon.icon'
        ]
        // Push any additional query params to the array
        populateList.push(ctx.query.populate)
        ctx.query.populate = populateList.join(',')

        const content = await super.find(ctx)
        return content
    }
}));
