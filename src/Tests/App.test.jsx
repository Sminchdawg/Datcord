import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('MyComponent', () => {
  it('renders app', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.contains()).toEqual(true);
  });
});