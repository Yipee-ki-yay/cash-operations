import { getSundayOfSameWeek } from "./src/utils/date.js";
import { readAndParseFile } from "./src/utils/file-utils.js";
import { getConfigs } from "./src/utils/cash-configs.js";
import { roundFee, calcCommissionFee } from "./src/utils/calc.js";

async function calcCashApp() {
  const { configs } = await getConfigs();
  const args = process.argv;
  const inputFilePath = args[2];

  let cashOutAmountDuringWeek = {};
  const jsonData = readAndParseFile(inputFilePath);

  const result = jsonData.map(cur => {
    const operationAmount = cur.operation.amount;

    if (cur.type === "cash_in") {
      const maxFeeForOperation = configs.cashIn.max.amount;
      const commissionFee = calcCommissionFee({
        amount: operationAmount,
        type: "cashIn",
        configs,
      });
      const finalFee =
        commissionFee > maxFeeForOperation ? maxFeeForOperation : commissionFee;

      return roundFee(finalFee);
    }

    if (cur.type === "cash_out" && cur.user_type === "natural") {
      let commissionFee = 0;
      const weekLimit = configs.cashOutNatural.week_limit.amount;
      const curOpDate = new Date(cur.date);

      if (!(cur.user_id in cashOutAmountDuringWeek)) {
        if (operationAmount > weekLimit) {
          commissionFee = calcCommissionFee({
            amount: operationAmount,
            withWeekLimit: true,
            type: "cashOutNatural",
            configs,
          });
          cashOutAmountDuringWeek[cur.user_id] = {
            operationAmount,
            opDate: curOpDate,
            lastDayOfWeekLimit: getSundayOfSameWeek(cur.date),
          };
          return roundFee(commissionFee);
        } else {
          cashOutAmountDuringWeek[cur.user_id] = {
            operationAmount,
            opDate: curOpDate,
            lastDayOfWeekLimit: getSundayOfSameWeek(cur.date),
          };
          return roundFee(commissionFee);
        }
      } else {
        // reset if next week
        cashOutAmountDuringWeek[cur.user_id].opDate = curOpDate;
        if (
          cashOutAmountDuringWeek[cur.user_id].opDate >
          cashOutAmountDuringWeek[cur.user_id].lastDayOfWeekLimit
        ) {
          cashOutAmountDuringWeek[cur.user_id] = {
            operationAmount: 0,
            opDate: curOpDate,
            lastDayOfWeekLimit: getSundayOfSameWeek(cur.date),
          };
        }

        // calc
        let weekOpAmount = cashOutAmountDuringWeek[cur.user_id].operationAmount;
        weekOpAmount += operationAmount;

        if (
          weekOpAmount > weekLimit &&
          weekOpAmount - weekLimit < operationAmount
        ) {
          commissionFee = calcCommissionFee({
            amount: weekOpAmount,
            withWeekLimit: true,
            type: "cashOutNatural",
            configs,
          });
          return roundFee(commissionFee);
        }

        if (
          weekOpAmount > weekLimit &&
          weekOpAmount - weekLimit > operationAmount
        ) {
          commissionFee = calcCommissionFee({
            amount: operationAmount,
            type: "cashOutNatural",
            configs,
          });
          return roundFee(commissionFee);
        }

        return roundFee(commissionFee);
      }
    }

    if (cur.type === "cash_out" && cur.user_type === "juridical") {
      const minFeeForOperation = configs.cashOutLegal.min.amount;
      const commissionFee = calcCommissionFee({
        amount: operationAmount,
        type: "cashOutLegal",
        configs,
      });
      const finalFee =
        commissionFee > minFeeForOperation ? commissionFee : minFeeForOperation;

      return roundFee(finalFee);
    }
  });

  for(let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }
}

calcCashApp();