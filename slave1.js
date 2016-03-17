var fs = require('fs'),
    soap = require('soap'),
    request = require('request'),
    http = require('http');

var PORT_ECOUTE = 8001;

// Définition du service 
var myService = {
      mediateurslave: {
          mediateurslaveSoap: {
              getAnswer: function(args) {
                
                return {result : "ok"};
              }
          }
      }
};

// Creation du server à partir du WSDL
var xml = require('fs').readFileSync('mediateur_slave1.wsdl', 'utf8'),
    server = http.createServer(function(request,response) {
        response.end("404: Not Found: " + request.url);
    });

server.listen(PORT_ECOUTE);
service = soap.listen(server, '/mediateurslave', myService, xml);
