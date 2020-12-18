import React from 'react';
import renderer from 'react-test-renderer';
import MeridiemView from '@/components/Alarm/MeridiemView';

jest.useFakeTimers();
describe('<MeridiemView />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<MeridiemView data={['AM', 'PM']} initValue={'AM'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
