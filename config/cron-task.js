const axios = require('axios')

module.exports = {
    

    // everyday at 12:00 am: 0 0 * * *   every 3 seconds: */3 * * * * *
    
    // update values of important quotes everyday at midnight
    '0 0 * * mon-fri': async ({ strapi }) => {

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
            'XPDUSD',
            'XBRUSD',
            'XTIUSD',
            'AUS200',
            'UK100'
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

    // get everestcm trade cards and forex, metal categories live data
    '*/5 * * * * mon-fri': async ({ strapi }) => {

        // default trade cards quotes
        const trade_titles = ['EURUSD', 'USDJPY', 'GBPUSD', 'XAUUSD']

        // default forex quotes
        const forex_titles = [
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
        // default metal quotes
        const metal_titles = [
            'XAUUSD',
            'XAGUSD',
            'XPTUSD',
            'XPDUSD'
        ]
        
        // default energies quotes
        const energy_titles = [
            'XBRUSD',
            'XTIUSD'
        ]

        // default indices quotes
        const indice_titles = [
            'AUS200',
            'UK100'
        ]

        // for every trade card quote title run api
        for( let i = 0; i < trade_titles.length; i++) {

            const title = trade_titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                const bid = data[title].bid
                const ask = data[title].ask

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
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'EURUSD' || title === 'GBPUSD') 
                        ? (ask - bid) * 10000 
                        : title === 'USDJPY'
                        ? (ask - bid) * 100 
                        :
                        (ask - bid)
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::trade-card.trade-card',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? bid.toFixed(5) : bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? ask.toFixed(5) : ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'EURUSD' || title === 'GBPUSD') 
                        ? (ask - bid) * 10000 
                        : title === 'USDJPY'
                        ? (ask - bid) * 100 
                        :
                        (ask - bid)
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    
        // for every forex quote title run api
        for( let i = 0; i < forex_titles.length; i++) {

            const title = forex_titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                const bid = data[title].bid
                const ask = data[title].ask

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
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'USDJPY') 
                        ? (ask - bid) * 100
                        : (title === 'USDRUB')
                        ? (ask - bid)
                        : (ask - bid) * 10000
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::forex.forex',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? bid.toFixed(5) : bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? ask.toFixed(5) : ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'USDJPY') 
                        ? (ask - bid) * 100
                        : (title === 'USDRUB')
                        ? (ask - bid)
                        : (ask - bid) * 10000
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }

        // for every metal quote title run api
        for( let i = 0; i < metal_titles.length; i++) {

            const title = metal_titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                const bid = data[title].bid
                const ask = data[title].ask

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
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'XAGUSD') 
                        ? (ask - bid) * 100
                        : (ask - bid)
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::metal.metal',result[0].id,{
                        data: {
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (title === 'XAGUSD') 
                        ? (ask - bid) * 100
                        : (ask - bid)
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }

        // for every energies quote title run api
        for( let i = 0; i < energy_titles.length; i++) {

            const title = energy_titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                const bid = data[title].bid
                const ask = data[title].ask

                // find and get old bid and old ask of any quote from quotes-defaults database
                const old = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                const oldbid = old[0].bid
                const oldask = old[0].ask
        
                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::energy.energy',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::energy.energy',{
                        data: {
                        title: title,
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (ask - bid)
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::energy.energy',result[0].id,{
                        data: {
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (ask - bid)
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }

        // for every indices quote title run api
        for( let i = 0; i < indice_titles.length; i++) {

            const title = indice_titles[i]
            // get quote of each title
            const { data } = await axios.get(`http://summit-lb-tf-1076725243.eu-west-1.elb.amazonaws.com/quotes/${title}/`)
            .catch((err) => console.log(err))
           
            if(data) {

                const bid = data[title].bid
                const ask = data[title].ask

                // find and get old bid and old ask of any quote from quotes-defaults database
                const old = await strapi.entityService.findMany('api::quotes-default.quotes-default',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                const oldbid = old[0].bid
                const oldask = old[0].ask
        
                // find if quote title exists on database
                const result = await strapi.entityService.findMany('api::indice.indice',{
                    filters: {
                        title: title
                    }
                }).catch((err) => console.log(err))

                // if it doesn't exist in database
                if(result.length === 0 ) {

                    // create a new row with quote details
                    await strapi.entityService.create('api::indice.indice',{
                        data: {
                        title: title,
                        bid: bid,
                        ask: ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (ask - bid)
                        }
                    }).catch((err) => console.log(err))

                } else {

                    // update the existing row with new details
                    await strapi.entityService.update('api::indice.indice',result[0].id,{
                        data: {
                        bid: (title === 'EURUSD' || title === 'GBPUSD') ? bid.toFixed(5) : bid,
                        ask: (title === 'EURUSD' || title === 'GBPUSD') ? ask.toFixed(5) : ask,
                        oldbid: oldbid,
                        oldask: oldask,
                        pips: (ask - bid)
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },
};
   