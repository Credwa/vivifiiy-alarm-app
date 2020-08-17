import * as React from 'react';
import renderer from 'react-test-renderer';

import VivText from '@/components/VivText';

describe('<VivText />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<VivText>Snapshot test!</VivText>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
