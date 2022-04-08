module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0b2256c5b48420376fcd6799d1b27631'),
  },
});
