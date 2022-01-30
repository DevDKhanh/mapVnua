import {REQ_COMPONENTS_DISPLAY} from '../constantRedux/type.ComponentDisplay'

const INITIAL_STATE = {
  data: {
    area: [],
    classify: [],
    layer: [],
    setting: [],
    language: [],
    account: [],
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
        data: {...state.data, [payload.paramName]: payload.data},
        theadTable: payload.theadTable,
      }

    default:
      return state
  }
}
