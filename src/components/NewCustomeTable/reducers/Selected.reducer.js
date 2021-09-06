const RESET_FORM = 'Selected/RESET_FORM';
const UPDATE_IDS_SELECTED = 'Selected/UPDATE_IDS_SELECTED';

export const resetSelected = (payload) => ({
  type: RESET_FORM,
  payload,
});

export const updateSelected = (payload, rows) => ({
  type: UPDATE_IDS_SELECTED,
  payload,
  rows,
});

export const INITIAL_STATE = {
  idsSelected: [],
  rowsSelected: [],
};

const SelectedReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_IDS_SELECTED:
      return {
        ...state,
        idsSelected: action.payload,
        rowsSelected: action.rows,
      };

    case RESET_FORM:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default SelectedReducer;
