const initialState = {
  banksList: [],
  branchesList: [],
  branchesBankList: [],
  currentBank: undefined,
  currentBranch: undefined,
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_BANKS': {
      return ({
        ...state,
        banksList: action.payload,
      })
    };

    case 'SET_BRANCHES': {
      return ({
        ...state,
        branchesList: action.payload,
      });
    };

    case 'SET_BRANCHES_BANK': {
      return ({
        ...state,
        branchesBankList: state.branchesList.filter((item) => item.bank === action.payload.pk),
        currentBank: action.payload,
      });
    };

    case 'SET_CURRENT_BRANCHE': {
      return ({
        ...state,
        currentBranch: action.payload,
      });
    };

    default:
      return state;
  }
};

export default reducer;
