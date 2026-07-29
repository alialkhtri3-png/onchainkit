import fs from "fs";
import crypto from "crypto";

const report = fs.readFileSync(
  "finance/report.json"
);

const hash = crypto
  .createHash("sha256")
  .update(report)
  .digest("hex");

const output = {
  project: "OnchainKit",
  algorithm: "SHA-256",
  reportHash: hash,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(
  "finance/report-hash.json",
  JSON.stringify(output,null,2)
);

console.log(output);
