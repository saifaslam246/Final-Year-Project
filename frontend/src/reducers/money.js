import {
  MONEY_RECORD_REQUEST,
  MONEY_RECORD_SUCCESS,
  MONEY_RECORD_FAIL,
} from "../constants/money";

export const moneyReducer = (state = {}, action) => {
    switch (action.type) {
        case MONEY_RECORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case MONEY_RECORD_SUCCESS:
            return {
                ...state,
                loading: false,
                money: action.payload
            }
        case MONEY_RECORD_FAIL:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}