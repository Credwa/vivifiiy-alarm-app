import * as React from 'react';
import renderer from 'react-test-renderer';

import VivText from '@/components/VivText';
import Colors from '@/constants/Colors';

describe('<VivText />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<VivText>Snapshot test!</VivText>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it(`renders headline text correctly`, () => {
    const tree = renderer
      .create(
        <VivText color={Colors.greyLight2} fontName="Headline">
          Snapshot test!
        </VivText>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
