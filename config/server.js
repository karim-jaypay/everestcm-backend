const cronTasks = require('./cron-task')

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1338),
  cron: {
    enabled: true,
    tasks: cronTasks,
  }
});
