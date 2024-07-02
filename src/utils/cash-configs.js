import {
  getCashInConfig,
  getCashOutNaturalConfig,
  getCashOutLegalConfig,
} from "../services/operation-configs.js";

export const getConfigs = async () => {
  let cashInConfig;
  let cashOutNaturalConfig;
  let cashOutLegalConfig;

  try {
    cashInConfig = await getCashInConfig();
    cashOutNaturalConfig = await getCashOutNaturalConfig();
    cashOutLegalConfig = await getCashOutLegalConfig();
  } catch (error) {
    console.log("error", error);
  }

  return {
    configs: {
      cashIn: cashInConfig,
      cashOutNatural: cashOutNaturalConfig,
      cashOutLegal: cashOutLegalConfig,
    },
  };
};

