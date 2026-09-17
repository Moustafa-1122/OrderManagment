import winston from "winston";
import config from "../config";

const logFileFormat = winston.format.combine(
    winston.format.timestamp({format:"YYYY-MM-DD"}),
    winston.format.json(),
    winston.format.splat(),
    winston.format.errors({stack:true})
)


const {logDir, isDev} = config;

const logConsoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp({format:"YYYY-MM-DD"}),
     winston.format.splat(),
    winston.format.printf(({timestamp, level, message, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
    })
)


const logger = winston.createLogger({
    level:"info",
    transports:[
        
        new winston.transports.File({filename:"error.log",dirname:logDir,level:"error",format:logFileFormat}),
        new winston.transports.File({filename:"combined.log",dirname:logDir,format:logFileFormat})

    ],
    exceptionHandlers:[
        new winston.transports.File({filename:"exceptions.log",dirname:logDir})
    ]
})
if(isDev){
    logger.add(new winston.transports.Console({format:logConsoleFormat}))
    logger.level = "debug"
}
export default logger;