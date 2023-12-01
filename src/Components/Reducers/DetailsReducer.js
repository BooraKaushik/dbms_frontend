const DetailsReducer = (state = { dataPresent: false, data: {} }, action) => {
  switch (action.type) {
    case "UPDATE":{
      console.log(action.transfer);
      return { dataPresent: false, data: action.transfer };}
    default:
      return state;
  }
};
export default DetailsReducer;
