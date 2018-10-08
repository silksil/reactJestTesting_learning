import React from 'react';
import { mount } from 'enzyme';
import moxios from 'moxios';
import Root from '../Root';
import App from '../components/app';

beforeEach(() => {
  // setup maxios and say to intercept every axios request
  moxios.install();

  // if it sees a request, it should automatically respond and trick axios
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetched #1' }, { name: 'Fetched #2'}]
  });
});

afterEach(() => {
  // after our test runs, we want to uninstall out to not mock other requests with the same mock
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done)=> {
  //attemt to render the applyMiddleware
  const wrapped = mount(
    <Root>
      <App />
    </Root>
  )
  // find the 'fetchComments' button and click interval
  wrapped.find('.fetch-comments').simulate('click');

  /*
  after we initialize a request we directly check if the LI's are visible
  this  will fail if we don't fail, as it takes some time before Maxios issued the requests
  */
  moxios.wait(() => {
    wrapped.update();
    // expect to find a list of comments
    expect(wrapped.find('li').length).toEqual(2);

    // done() is added to say that is completed after it is invoked
    done();
    wrapped.unmount();
  });
});
