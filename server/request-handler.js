/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var results = []; 
var requestHandler = function(request, response) {
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  var headers = defaultCorsHeaders;
  headers['Content-Type'] = 'application/json';
  var method = request.method;
  var url = request.url;
  var body = [];
  var statusCode; 

  if (method === 'POST') {
    statusCode = 201; 
    var jsonString = '';
    request.on('data', function(chunk) {
      body.push(chunk); 
    }).on('end', function() {
      body = Buffer.concat(body).toString();
      console.log(body, 'new body');
      results.push(JSON.parse(body));
    });
  }
  

  // if (method === 'POST') {
  //   statusCode = 201; 
  //   var jsonString = '';
  //   request.on('data', function(chunk) {
  //     jsonString += chunk; // concat chunk 
  //     body.push(jsonString);
  //     results.push(JSON.parse(body)); //WHY ARE WE JSON.PARSING HERE?
  //   });
  // } 
  // if (method === 'POST') {
  //   statusCode = 201; 
  //   request.on('data', function(chunk) {
  //     body.push(chunk);
  //     results = Buffer.concat(body).toString();
  //   });
  // } 

  if (method === 'GET') {
    statusCode = 200; 
  }

  var responseBody = {
    headers: headers,
    method: method,
    url: url,
    results: results
  };
  console.log(responseBody);
  response.writeHead(statusCode, headers); 
  response.end(JSON.stringify({results: results}));
};

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

module.exports.requestHandler = requestHandler;
