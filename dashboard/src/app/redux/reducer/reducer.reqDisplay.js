import {REQ_COMPONENTS_DISPLAY} from '../constantRedux/type.ComponentDisplay'

const INITIAL_STATE = {
  textComponentDisplay: 'Khu vực',
  data: {
    area: [],
    classify: [],
    layer: [],
    document: [],
    setting: [],
    language: [],
  },
  theadTable: 'area',
}

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = INITIAL_STATE, {type, payload}) => {
  switch (type) {
    case REQ_COMPONENTS_DISPLAY:
      console.log()
      return {
        ...state,
        textComponentDisplay: payload.text
          ? payload.text
          : state.textComponentDisplay,
        data: {...state.data, [payload.paramName]: payload.data},
        theadTable: payload.theadTable,
      }

    default:
      return state
  }
}
