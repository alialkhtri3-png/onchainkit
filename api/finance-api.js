import express from "express";
import fs from "fs";
import csv from "csv-parser";

const app = express();
const PORT = 3005;

app.get("/api/finance", (req,res)=>{

  const transactions = [];
  let total = 0;
  let currency = "USD";

  fs.createReadStream("finance/transactions.csv")
  .pipe(csv())
  .on("data", row=>{

    transactions.push(row);

    const amount =
      Number(row.netAmount) ||
      Number(row.amount) ||
      0;

    total += amount;

    if(row.currency)
      currency = row.currency;

  })
  .on("end",()=>{

    res.json({
      project:"OnchainKit",
      protocol:"Open Collective Finance API",
      generatedAt:new Date().toISOString(),
      transactions:transactions.length,
      total,
      currency,
      data:transactions
    });

  });

});


app.listen(PORT,()=>{
 console.log(`Finance API running: http://localhost:${PORT}`);
});
