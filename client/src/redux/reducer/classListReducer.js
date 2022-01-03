import {
  ADD_CLASS_LIST_NOTE,
  REMOVED_CLASS_LIST_NOTE,
} from "../constantRedux/typeClassList";

const INITIAL_STATE = {
  arrayClassNote: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_CLASS_LIST_NOTE: {
      // actione.payload typeof array
      return {
        ...state,
        arrayClassNote: [...state.arrayClassNote, action.payload],
      };
    }
    case REMOVED_CLASS_LIST_NOTE: {
      let arrayClassNoteNew = [...state.arrayClassNote];
      arrayClassNoteNew = arrayClassNoteNew.filter(
        (item) => item !== action.payload
      );
      return {
        ...state,
        arrayClassNote: arrayClassNoteNew,
      };
    }
    default:
      return state;
  }
};

export default reducer;
