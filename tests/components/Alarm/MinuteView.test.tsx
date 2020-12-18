import React from 'react';
import renderer from 'react-test-renderer';
import MinuteView from '@/components/Alarm/MinuteView';
import { generateTimerArray } from '@/utils';
jest.useFakeTimers();
describe('<MinuteView />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<MinuteView data={generateTimerArray(59, true, 2)} initValue={'23'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
