var brochureResponse = require('./brochure-response');

exports.webhookRoutes = function(router){
  router.post('/brochure-request', brochureResponse.send);
};
