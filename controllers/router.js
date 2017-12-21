var brochure = require('./brochure');

exports.webhookRoutes = function(router){
  router.post('/brochure-request', brochure.create);
};
