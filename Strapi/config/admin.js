module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '1de45cab0d67f9a1fa926a02588a4b4e'),
  },
});
