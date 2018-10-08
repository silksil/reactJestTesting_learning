import commentsReducer from '../comments';
import { SAVE_COMMENT } from '../../actions/types';

// to tests reducers you call the reducer, pass a fake action and make an expectation of what it returns
it('handles actions of type SAVE_COMMENT', () => {
  const action = {
    type: SAVE_COMMENT,
    payload: 'New Comment'
  };

  const newState = commentsReducer([], action);
  expect(newState).toEqual(['New Comment']);
})
