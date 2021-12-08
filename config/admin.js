module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1f5f6717c434de41db62927c58e1019c'),
  },
});
