import { roundFee, calcCommissionFee } from "./calc.js";
import { getConfigs } from "./cash-configs.js";


describe("calc utils", () => {
  let configs;

  beforeAll(async () => {
    const configsData = await getConfigs();
    configs = configsData.configs;
  });

  test("roundFee 0.051 -> 0.06", () => {
    expect(roundFee(0.051)).toBe("0.06");
  });

  test("roundFee 0.059 -> 0.06", () => {
    expect(roundFee(0.059)).toBe("0.06");
  });

  test("roundFee 0.050 -> 0.050", () => {
    expect(roundFee(0.05)).toBe("0.05");
  });

  test("calcCommissionFee amount: 3000, type: cashIn, toBe 0.9", async () => {
    let calcCommissionFeeArgs = { amount: 3000, type: "cashIn", configs };

    expect(calcCommissionFee(calcCommissionFeeArgs)).toBe(0.9);
  });

  test("calcCommissionFee amount: 30000, type: cashOutNatural, toBe 87", async () => {
    let calcCommissionFeeArgs = { amount: 30000, withWeekLimit: true, type: "cashOutNatural", configs };

    expect(calcCommissionFee(calcCommissionFeeArgs)).toBe(87);
  });

  test("calcCommissionFee amount: 300, type: cashOutLegal, toBe 0.90", async () => {
    let calcCommissionFeeArgs = { amount: 300, type: "cashOutLegal", configs };

    expect(calcCommissionFee(calcCommissionFeeArgs)).toBe(0.90);
  });
});
