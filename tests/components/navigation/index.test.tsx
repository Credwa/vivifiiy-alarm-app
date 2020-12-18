import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from '@/components/navigation';

jest.useFakeTimers();
describe('<Navigation />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<Navigation />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
