import { useImmerReducer } from "use-immer";

export const createSlice = (config) => {
  const [state, dispatch] = useImmerReducer(reducer, config.initialState);

  function reducer(state, action) {
    config.reducers[action.type](state, action);
  }

  const actions = {};
  Object.keys(config.reducers).forEach((name) => {
    actions[name] = function (payload) {
      dispatch({
        type: name,
        payload,
      });
    };
  });

  return { state, dispatch, actions };
};
