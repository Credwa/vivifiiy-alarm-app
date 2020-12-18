import React from 'react';
import renderer from 'react-test-renderer';
import Container from '@/components/ScrollSelector/src/Container';

describe('ScrollSelector/src/ <Container />', () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(<Container wrapperHeight={180} wrapperWidth={150} wrapperBackground={'red'} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
