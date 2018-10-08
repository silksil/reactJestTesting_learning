import React from 'react';
import { mount } from 'enzyme';
import CommentBox from '../CommentBox';
import Root from '../../Root';

let wrapped;

beforeEach(() => {
  wrapped = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});

afterEach(()=> {
  wrapped.unmount();
});


it('has a text area and a button', () => {
  expect(wrapped.find('textarea').length).toEqual(1);
  expect(wrapped.find('button').length).toEqual(2);
});

describe('the text area', () => {
  beforeEach(() => {
    wrapped.find('textarea').simulate('change', {
      target: { value: 'new comment' }
    });
    wrapped.update();
  });

  /*
  1. find the textarea element
  2. simulate the 'change' event
  3. Provide a fake event object => a mock event object that will be merged with the event object passed to the handlers
  4. Force the component to update => setState is asyncronous. Thus, you have to force it to re-render.
  5. Assert that the textareas value has changed
  */
  it('has a text area that users can type in', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    // the prop method allows you to retrieve the prop that you assigned to an element.
    // In this case you check whether the prop `value` is equal to the string 'new comment'
  });
  // to trick that it is submitted we have to simulate a submit event, rather than a click on the button
  it('it has a text area that empties after it is submitted', () => {
    expect(wrapped.find('textarea').prop('value')).toEqual('new comment');
    wrapped.find('form').simulate('submit');
    wrapped.update();
    expect(wrapped.find('textarea').prop('value')).toEqual('');
  });
});
