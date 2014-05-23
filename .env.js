module. exports = {
  "MONGO_URI": process.env.MONGO_URI || "mongodb://localhost:27017/demoblog", 
  "NODE_ENV": process.env.NODE_ENV || "development",
  "NODEJS_IP": process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1",
  "NODEJS_PORT": process.env.OPENSHIFT_NODEJS_PORT || "8080",
  "SESSION_SECRET": process.env.SESSION_SECRET || 'ilovetowriteanawesomeblog'
};