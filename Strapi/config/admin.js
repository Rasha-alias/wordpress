module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'dbf01692e74c53552ca4efe059066b31'),
  },
});
