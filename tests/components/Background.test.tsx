import React from 'react';
import renderer from 'react-test-renderer';
import Background from '@/components/Background';

describe('<Background/>', () => {
  it(`renders correctly`, async () => {
    const tree = await renderer.create(<Background>Snapshot test!</Background>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
