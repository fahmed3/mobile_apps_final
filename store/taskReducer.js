import { ADD_TASK, DELETE_TASK, DID_TASK, UPDATE_ABC } from './taskTypes';

const initialState = {
  abcNotation: `X: 1
T: Sketch
K: C
L: 1/4
M: 4/4
| A B c d|]`};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            task: action.payload,
            done: false,
            id: Math.random().toString(),
          },
        ],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((item) => item.id != action.payload),
      };
    case DID_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) => {
          if (item.id != action.payload) {
            return item;
          }
          return {
            ...item,
            done: true,
          };
        }),
      };
    case UPDATE_ABC:
      return {
        ...state,
        abcNotation: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
