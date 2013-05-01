var httpProxy = require("http-proxy");

var proxyServer = httpProxy.createServer(function (req, res, proxy) {
  var destinations = {
    "default": {
      host: "www.nodelabs.org",
      port: 80
    },
    "messages": {
      host: "immense-brook-2467.herokuapp.com",
      port: 80
    }
  };

  var destination = destinations["default"];

  if (req.url.match(/^\/messages/i)) {
    destination = destinations["messages"];
  }

  console.log("Proxying " + req.url + " to " + destination.host);
  req.headers.host = destination.host;
  proxy.proxyRequest(req, res, destination);
});

proxyServer.listen(process.env.PORT || 3000);