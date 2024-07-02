import axios from "axios";

const BASE_URL = "https://developers.paysera.com/tasks";
const GET_CASH_IN_CONFIG = BASE_URL + "/api/cash-in";
const GET_CASH_OUT_NATURAL_CONFIG = BASE_URL + "/api/cash-out-natural";
const GET_CASH_OUT_LEGAL_CONFIG = BASE_URL + "/api/cash-out-juridical";

export const getCashInConfig = async () => {
  const response = await axios.get(GET_CASH_IN_CONFIG);
  return response.data;
};

export const getCashOutNaturalConfig = async () => {
  const response = await axios.get(GET_CASH_OUT_NATURAL_CONFIG);
  return response.data;
};

export const getCashOutLegalConfig = async () => {
  const response = await axios.get(GET_CASH_OUT_LEGAL_CONFIG);
  return response.data;
};
