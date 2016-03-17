var fs = require('fs'),
    soap = require('soap'),
    request = require('request'),
    http = require('http');

var PORT_ECOUTE = 8000;

// Définition des esclaves
var slaves = 
{
  0 : { 'url' :'http://localhost:8002/mediateurslave' ,
      'count' : 0 },
  1 : { 'url' :'http://localhost:8001/mediateurslave' ,
      'count' : 0 }
}

// Définition du service 
var myService = {
      mediateurmaitre: {
          mediateurmaitreSoap: {
              getAnswer: function(args, callback) {
                  // On cherche l'esclave le moins occupé
				          min = slaves[0]['count'];
                  index = 0;

                  for(i = 1; i < Object.keys(slaves).length; ++i)
                  {
                    if (slaves[i]['count'] < min)
                    {
                      min = slaves[i]['count'];
                      index = i;
                    }
                  }

                  ++slaves[index]['count'];

                  // On appelle l'esclave
                  var args = {};
                  var resultat = '';
                  
                  console.log("ON APPELLE ESCLAVE : " + index)

                  soap.createClient(slaves[index]['url']+'?wsdl', function(err, client) {

                      client.getAnswer(args, function(err, result) {
                          resultat = result.result;

                          // L'esclave a répondu, on décrémente son compteur
                          --slaves[index]['count'];

                          // La reponse de l'esclave est renvoyé à l'utilisateur final
                          callback({
                             result : resultat
                          })
                      });

                  });

                  
              }
          }
      }
};

// Creation du server à partir du WSDL
var xml = require('fs').readFileSync('mediateur_maitre.wsdl', 'utf8'),
    server = http.createServer(function(request,response) {
        response.end("404: Not Found: " + request.url);
    });

server.listen(PORT_ECOUTE, "0.0.0.0");
service = soap.listen(server, '/mediateurmaitre', myService, xml);

// Implémentation de WSSecurity pour nodejs - username/password : root/root
service.authenticate = function(security) {
  var created, nonce, password, user, token;
  token = security.UsernameToken, user = token.Username,
          password = token.Password, nonce = token.Nonce, created = token.Created;
  return user === 'root' && password.$value === 'root';
};