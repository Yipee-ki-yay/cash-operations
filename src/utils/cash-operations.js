import { roundFee, calcCommissionFee } from "./calc.js";
import { getSundayOfSameWeek } from "./date.js";

export const calcCashInOp = ({ configs, operationAmount }) => {
  const maxFeeForOperation = configs.cashIn.max.amount;
  const commissionFee = calcCommissionFee({
    amount: operationAmount,
    type: "cashIn",
    configs,
  });
  const finalFee =
    commissionFee > maxFeeForOperation ? maxFeeForOperation : commissionFee;

  return roundFee(finalFee);
};

export const calcCashOutNatural = ({
  configs,
  operationAmount,
  opSettings,
  cashOutAmountDuringWeek,
}) => {
  let commissionFee = 0;
  const weekLimit = configs.cashOutNatural.week_limit.amount;
  const curOpDate = new Date(opSettings.date);

  if (!(opSettings.user_id in cashOutAmountDuringWeek)) {
    if (operationAmount > weekLimit) {
      commissionFee = calcCommissionFee({
        amount: operationAmount,
        withWeekLimit: true,
        type: "cashOutNatural",
        configs,
      });
      cashOutAmountDuringWeek[opSettings.user_id] = {
        operationAmount,
        opDate: curOpDate,
        lastDayOfWeekLimit: getSundayOfSameWeek(opSettings.date),
      };
      return roundFee(commissionFee);
    } else {
      cashOutAmountDuringWeek[opSettings.user_id] = {
        operationAmount,
        opDate: curOpDate,
        lastDayOfWeekLimit: getSundayOfSameWeek(opSettings.date),
      };
      return roundFee(commissionFee);
    }
  } else {
    // reset if next week
    cashOutAmountDuringWeek[opSettings.user_id].opDate = curOpDate;
    if (
      cashOutAmountDuringWeek[opSettings.user_id].opDate >
      cashOutAmountDuringWeek[opSettings.user_id].lastDayOfWeekLimit
    ) {
      cashOutAmountDuringWeek[opSettings.user_id] = {
        operationAmount: 0,
        opDate: curOpDate,
        lastDayOfWeekLimit: getSundayOfSameWeek(opSettings.date),
      };
    }

    // calc
    let weekOpAmount =
      cashOutAmountDuringWeek[opSettings.user_id].operationAmount;
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
};

export const calcCashOutLegalOp = ({ configs, operationAmount }) => {
  const minFeeForOperation = configs.cashOutLegal.min.amount;
  const commissionFee = calcCommissionFee({
    amount: operationAmount,
    type: "cashOutLegal",
    configs,
  });
  const finalFee =
    commissionFee > minFeeForOperation ? commissionFee : minFeeForOperation;

  return roundFee(finalFee);
};
