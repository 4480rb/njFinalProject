const dotenv=require('dotenv')
dotenv.config();
port=process.env.PORT;
connection_string=process.env.CONNECTION_STRING;
environment=process.env.ENVIRONMENT;
module.exports={port,connection_string,environment}