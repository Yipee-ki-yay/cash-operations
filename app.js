import { readAndParseFile } from "./src/utils/file-utils.js";
import { getConfigs } from "./src/utils/cash-configs.js";
import {
  calcCashInOp,
  calcCashOutNatural,
  calcCashOutLegalOp,
} from "./src/utils/cash-operations.js";

async function calcCashApp() {
  const { configs } = await getConfigs();
  const args = process.argv;
  const inputFilePath = args[2];

  let cashOutAmountDuringWeek = {};
  const jsonData = readAndParseFile(inputFilePath);

  const result = jsonData.map((opSettings) => {
    const operationAmount = opSettings.operation.amount;

    if (opSettings.type === "cash_in") {
      return calcCashInOp({ configs, operationAmount });
    }

    if (opSettings.type === "cash_out" && opSettings.user_type === "natural") {
      return calcCashOutNatural({
        configs,
        operationAmount,
        opSettings,
        cashOutAmountDuringWeek,
      });
    }

    if (
      opSettings.type === "cash_out" &&
      opSettings.user_type === "juridical"
    ) {
      return calcCashOutLegalOp({ configs, operationAmount });
    }
  });

  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
}

calcCashApp();
