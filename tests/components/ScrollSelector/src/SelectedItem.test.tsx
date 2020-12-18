import React from 'react';
import renderer from 'react-test-renderer';
import SelectedItem from '@/components/ScrollSelector/src/SelectedItem';

describe('ScrollSelector/src/ <SelectedItem />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<SelectedItem key={0} itemHeight={60} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
