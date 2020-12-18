import React from 'react';
import renderer from 'react-test-renderer';
import HighlightView from '@/components/ScrollSelector/src/HighlightView';

describe('ScrollSelector/src/ <HighlightView />', () => {
  it(`renders correctly`, () => {
    const tree = renderer
      .create(
        <HighlightView
          highlightColor={'#333'}
          highlightWidth={'100%'}
          wrapperHeight={180}
          itemHeight={60}
          highlightBorderWidth={2}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
