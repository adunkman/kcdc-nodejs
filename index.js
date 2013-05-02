var httpProxy = require("http-proxy");

var proxyServer = httpProxy.createServer(function (req, res, proxy) {
  var destinations = {
    "default": {
      host: "adunkman.github.io/workshop",
      port: 80
    },
    "achievements": {
      host: "nodelabs-adunkman.herokuapp.com",
      port: 80
    }
  };

  var destination;

  if (req.url.match(/^\/achievements/i) || req.url.match(/^\/socket\.io/i)) {
    destination = destinations["achievements"];
  }
  else {
    destination = destinations["default"];
    req.url = "/workshop" + req.url;
  }

  console.log("Proxying " + req.url + " to " + destination.host);
  req.headers.host = destination.host;
  proxy.proxyRequest(req, res, destination);
});

proxyServer.listen(process.env.PORT || 3000);