import React from 'react';
import renderer from 'react-test-renderer';
import Placeholder from '@/components/ScrollSelector/src/Placeholder';

describe('ScrollSelector/src/ <Placeholder />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<Placeholder itemHeight={50} wrapperHeight={300} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
