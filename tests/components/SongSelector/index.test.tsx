import React from 'react';
import renderer from 'react-test-renderer';
import SongSelector from '@/components/SongSelector';

describe('<SongSelector />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<SongSelector data={[]} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
