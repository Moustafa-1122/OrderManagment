import logger from './util/logger';
import { readCsv, writeCsv } from './util/parse'; 

async function main() {

  const data = await readCsv('src/data/data.csv', true); // set includeHeaders to true
  //for each data row log the row
  data.forEach((row) =>  logger.info(row));
} 
main();
