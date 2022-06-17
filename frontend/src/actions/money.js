import axios from "axios";
import {
  MONEY_RECORD_REQUEST,
  MONEY_RECORD_SUCCESS,
  MONEY_RECORD_FAIL,
} from "../constants/money";

export const myMoney = () => async (dispatch) => {
  try {
    dispatch({ type: MONEY_RECORD_REQUEST });

    const { data } = await axios.get("/api/v1/payment/totalmoney");

    dispatch({
      type: MONEY_RECORD_SUCCESS,
      payload: data.totalamount,
    });
  } catch (error) {
    dispatch({
      type: MONEY_RECORD_FAIL,
      payload: error.response.data.message,
    });
  }
};
