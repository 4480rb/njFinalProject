const winston=require('winston'); 
require('winston-mongodb');

 const logConfiguration={
     transports:[
         new winston.transports.Console({
             level:'warn'
         }),
         new winston.transports.Console({
            level:'info',
        }),
         new winston.transports.File({
            level:'error',
            filename:'log/errorsFile.log'
        }),
        new winston.transports.MongoDB({
            level:'error',
            db:"mongodb://srv1:27017/logs_Chavi&Orit",
            options:{
                useUnifiedTopology:true
            },
            collection:'server_logs',
        })
     ],
     
 format:winston.format.combine(
     winston.format.label({lable:`🤔`}),
     winston.format.timestamp({
         format:'MMM/DD/YYYY HH:mm:ss'
     }),
     winston.format.printf(info=>`${info.level}: ${[info.timestamp]}:${info.message} ${[info.lable]}`),
    )     
 };
 const logger=winston.createLogger(logConfiguration);

 module.exports=logger;