var contentResponse = require('./content-response');

exports.webhookRoutes = function(router){
  router.post('/content-request', contentResponse.send);
};
