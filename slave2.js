var fs = require('fs'),
    soap = require('soap'),
    request = require('request'),
    http = require('http');

var PORT_ECOUTE = 8002;

// Définition du service 
var myService = {
      mediateurslave: {
          mediateurslaveSoap: {
              getAnswer: function(args) {
                while(1) {}
                return {result : "ok"};
              }
          }
      }
};

// Creation du server à partir du WSDL
var xml = require('fs').readFileSync('mediateur_slave2.wsdl', 'utf8'),
    server = http.createServer(function(request,response) {
        response.end("404: Not Found: " + request.url);
    });

server.listen(PORT_ECOUTE, "0.0.0.0");
service = soap.listen(server, '/mediateurslave', myService, xml);
