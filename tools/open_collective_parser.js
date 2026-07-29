import fs from "fs";
import csv from "csv-parser";

const file = "finance/transactions.csv";

let transactions = [];
let total = 0;
let currency = "USD";

fs.createReadStream(file)
.pipe(csv())
.on("data", row => {

  transactions.push(row);

  let amount =
    Number(row.netAmount) ||
    Number(row.amount) ||
    Number(row.NetAmount) ||
    0;

  total += amount;

  if(row.currency)
    currency = row.currency;

})
.on("end", () => {

 console.log({
   project:"OnchainKit",
   generatedAt:new Date().toISOString(),
   transactions: transactions.length,
   total,
   currency
 });

});
