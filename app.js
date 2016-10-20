'use strict';

var util = require('util');
var SwaggerExpress = require('swagger-express-mw');
var SwaggerUI = require('swagger-tools/middleware/swagger-ui');
var app = require('express')();

const API_VERSION = 'v1';

var config = {
  appRoot: __dirname, // required config
  swaggerFile: util.format('api/swagger/%s.yaml', API_VERSION), // which swagger file
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  swaggerExpress.runner.swagger.basePath = util.format('/api/%s', API_VERSION);
  app.use(SwaggerUI(swaggerExpress.runner.swagger, {
    swaggerUi: '/docs', // Swagger UI URL
    apiDocs: util.format('/%s', API_VERSION), // api document URL
  }));

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port, function() {
    console.log(util.format('Serve on port %d', port));
  });
});

module.exports = app; // for testing
