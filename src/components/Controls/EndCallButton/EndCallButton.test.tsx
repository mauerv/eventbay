import React from 'react';
import { shallow } from 'enzyme';

import EndCallButton from './EndCallButton';

const mockRoom: any = { disconnect: jest.fn() };
jest.mock('hooks/useVideoContext/useVideoContext', () => () => ({ room: mockRoom }));
jest.mock('hooks/useAnalytics/useAnalytics', () => () => ({ logEvent: jest.fn() }));

describe('End Call button', () => {
  it('should disconnect from the room when clicked', () => {
    const wrapper = shallow(<EndCallButton />);
    wrapper.simulate('click');
    expect(mockRoom.disconnect).toHaveBeenCalled();
  });
});
