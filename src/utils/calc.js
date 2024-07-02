const formatFee = (num) => {
  return parseFloat(num).toFixed(2);
};

export const roundFee = (num) => {
  return formatFee(Math.ceil(num * 100) / 100);
};

export const calcCommissionFee = ({ amount, withWeekLimit, type, configs }) => {
  if (withWeekLimit) {
    const weekLimit = configs[type].week_limit.amount;
    return ((amount - weekLimit) * configs[type].percents) / 100;
  }

  return (amount * configs[type].percents) / 100;
};
