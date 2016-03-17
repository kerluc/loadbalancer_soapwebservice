  var soap = require('soap');
  var url = 'http://localhost:8000/mediateurmaitre?wsdl';
  var args = {};
  soap.createClient(url, function(err, client) {
	  client.setSecurity(new soap.WSSecurity('root', 'root'))
      client.getAnswer(args, function(err, result) {
          console.log(result.result);
      });
  });