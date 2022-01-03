import {
  ADD_CLASS_LIST_NOTE,
  REMOVED_CLASS_LIST_NOTE,
} from "../constantRedux/typeClassList";

export const addCLassListNote = (payload) => {
  return {
    type: ADD_CLASS_LIST_NOTE,
    payload: payload,
  };
};

export const removedClassListNote = (payload) => {
  return {
    type: REMOVED_CLASS_LIST_NOTE,
    payload: payload,
  };
};
