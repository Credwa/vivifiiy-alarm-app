import React from 'react';
import renderer from 'react-test-renderer';
import HourView from '@/components/Alarm/HourView';
import { generateTimerArray } from '@/utils';
jest.useFakeTimers();
describe('<HourView />', () => {
  it(`renders correctly`, () => {
    const tree = renderer.create(<HourView data={generateTimerArray(12, false, 2)} initValue={'08'} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
