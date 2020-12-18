import React from 'react';
import renderer from 'react-test-renderer';
import ItemText from '@/components/ScrollSelector/src/ItemText';

describe('ScrollSelector/src/ <ItemText />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<ItemText fontName={''} color={'red'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
