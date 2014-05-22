
module.exports = {
  "NODE_ENV": "development",
  "NODEJS_IP": process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
  "NODEJS_PORT": process.env.OPENSHIFT_NODEJS_PORT || "8080", 
};