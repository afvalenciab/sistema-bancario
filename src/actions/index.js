export const setBanks = (payload) => {
  return({
    type: 'SET_BANKS',
    payload,
  });
};

export const setBranches = (payload) => {
  return ({
    type: 'SET_BRANCHES',
    payload,
  });
};

export const setBranchesBank = (payload) => {
  return ({
    type: 'SET_BRANCHES_BANK',
    payload,
  });
};

export const setCurrentBranch = (payload) => {
  return ({
    type: 'SET_CURRENT_BRANCHE',
    payload,
  });
};
