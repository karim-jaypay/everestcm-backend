const axios = require('axios')

module.exports = {
    

    // everyday at 12:00 am: 0 0 * * *   every 3 seconds: */3 * * * * *
    
    // update values of important quotes everyday at midnight
    '0 0 * * *': async ({ strapi }) => {

        // default quotes
        const titles = [
            'EURUSD', 
            'USDJPY', 
            'GBPUSD', 
            'XAUUSD', 
            'USDCHF', 
            'USDCNH',
            'USDRUB',
            'AUDUSD',
            'NZDUSD',
            'USDCAD',
            'USDSEK',
            'XAUUSD',
            'XAGUSD',
            'XPTUSD',
            'XPDUSD'
        ]
    
        // for every quote title run api
        for( let i = 0; i < titles.length; i++) {

            const title = titles[i]
            
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))

            // if data is valid 
            if(data) {

                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::quotes-default.quotes-default',{
                        data: {
                        title: title,
                        bid: data[title].bid,
                        ask: data[title].ask,
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::quotes-default.quotes-default',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].bid.toFixed(5) : data[title].bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].ask.toFixed(5) : data[title].ask,
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },

    // get everestcm trade cards live data
    '*/3 * * * * *': async ({ strapi }) => {

        // default quotes
        const titles = ['EURUSD', 'USDJPY', 'GBPUSD', 'XAUUSD']
    
        // for every quote title run api
        for( let i = 0; i < titles.length; i++) {

            const title = titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                // find and get old bid and old ask of any quote from quotes-defaults database
                const old = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                const oldbid = old[0].bid
                const oldask = old[0].ask
        
                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::trade-card.trade-card',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::trade-card.trade-card',{
                        data: {
                        title: title,
                        bid: data[title].bid,
                        ask: data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::trade-card.trade-card',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].bid.toFixed(5) : data[title].bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].ask.toFixed(5) : data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },

    // get everestcm forex category live data
    '*/3 * * * * *': async ({ strapi }) => {

        // default quotes
        const titles = [
            'EURUSD', 
            'USDJPY', 
            'GBPUSD', 
            'USDCAD',
            'USDCHF',
            'USDCNH',
            'USDRUB',
            'AUDUSD',
            'NZDUSD',
            'USDSEK'
        ]
    
        // for every quote title run api
        for( let i = 0; i < titles.length; i++) {

            const title = titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                // find and get old bid and old ask of any quote from quotes-defaults database
                const old = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                const oldbid = old[0].bid
                const oldask = old[0].ask
        
                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::forex.forex',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::forex.forex',{
                        data: {
                        title: title,
                        bid: data[title].bid,
                        ask: data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::forex.forex',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].bid.toFixed(5) : data[title].bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? data[title].ask.toFixed(5) : data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },

    // get everestcm metals category live data
    '*/3 * * * * *': async ({ strapi }) => {

        // default quotes
        const titles = [
            'XAUUSD',
            'XAGUSD',
            'XPTUSD',
            'XPDUSD'
        ]
    
        // for every quote title run api
        for( let i = 0; i < titles.length; i++) {

            const title = titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                // find and get old bid and old ask of any quote from quotes-defaults database
                const old = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                const oldbid = old[0].bid
                const oldask = old[0].ask
        
                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::metal.metal',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::metal.metal',{
                        data: {
                        title: title,
                        bid: data[title].bid,
                        ask: data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::metal.metal',result[0].id,{
                        data: {
                        bid: data[title].bid,
                        ask: data[title].ask,
                        oldbid: oldbid,
                        oldask: oldask
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },

};
   