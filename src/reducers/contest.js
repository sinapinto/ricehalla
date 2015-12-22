const VOTE = 'VOTE';

const initialState = {
  votes: 0
};

export default function contest(state = initialState, action) {
  switch (action.type) {
    case VOTE:
      const {votes} = initialState;
      return {
        votes: votes + 1
      };
    default:
      return state;
  }
}
