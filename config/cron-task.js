const axios = require('axios')

module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
    // everyday at 12:00 am: 0 0 * * *   every 3 seconds: */3 * * * * *
    //'*/3 * * * * *': ({ strapi }) => {
      // Add your own logic here (e.g. send a queue of email, create a database backup, etc.).
     // console.log('hi')
    //},
    '0 0 * * *': async ({ strapi }) => {

        // default quotes
        const titles = ['EURUSD', 'USDJPY', 'GBPUSD', 'XAUUSD']
    
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
                        bid: data[title].bid,
                        ask: data[title].ask,
                        }
                    }).catch((err) => console.log(err))
                }
            }
        }
    },
  };
   