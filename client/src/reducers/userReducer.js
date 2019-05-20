import { FIND_PEOPLE, GET_ALL_USERS } from "../actions/types";

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return { users: action.payload };
    case FIND_PEOPLE:
      return { foundUsers: action.payload };
    default:
      return state;
  }
}
