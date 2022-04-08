module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '6426fb133adf5c90c47e9d37d5fa595b'),
  },
});
