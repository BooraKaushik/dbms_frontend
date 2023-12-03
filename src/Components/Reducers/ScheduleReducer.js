const ScheduleReducer = (state = { dataPresent: false, data: {} }, action) => {
  switch (action.type) {
    case "UPDATE_SCHEDULE": {
      return { dataPresent: false, data: action.transfer };
    }
    default:
      return state;
  }
};
export default ScheduleReducer;
