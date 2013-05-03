var httpProxy = require("http-proxy");

var proxyServer = httpProxy.createServer(function (req, res, proxy) {
  var destinations = {
    "default": {
      host: process.env.LABS_HOST || "localhost",
      port: process.env.LABS_PORT || 4000
    },
    "node": {
      host: process.env.NODE_HOST || "localhost",
      port: process.env.NODE_PORT || 4040
    }
  };

  var destination;

  if (req.url.match(/^\/(status|socket\.io|unlock|admin)/i)) {
    destination = destinations["node"];
  }
  else {
    destination = destinations["default"];
    req.url = "/workshop" + req.url;
  }

  console.log("Proxying " + req.url + " to " + destination.host + ":" + destination.port);
  req.headers.host = destination.host;
  proxy.proxyRequest(req, res, destination);
});

proxyServer.listen(process.env.PORT || 3000);
