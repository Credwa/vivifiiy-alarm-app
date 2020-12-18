import React from 'react';
import renderer from 'react-test-renderer';
import ScrollSelector from '@/components/ScrollSelector';

describe('<ScrollSelector />', () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <ScrollSelector
          dataSource={[]}
          overrideFontName={['Headline', 'Footnote']}
          selectedIndex={1}
          onValueChange={(data) => {}}
          wrapperWidth={350}
          itemHeight={50}
          highlightColor={'red'}
          highlightBorderWidth={0.001}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
