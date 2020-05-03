import React from 'react';
import { shallow } from 'enzyme';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';
import EndCallButton from './EndCallButton';

jest.mock('hooks/useAnalytics/useAnalytics', () => () => ({ logEvent: jest.fn() }));
jest.mock('hooks/useVideoContext/useVideoContext');
const mockUseVideoContext = useVideoContext as jest.Mock<any>;
const mockRoom: any = { disconnect: jest.fn() };
const mockSetRoomType = jest.fn();

describe('End Call button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should disconnect from the room when clicked', () => {
    mockUseVideoContext.mockReturnValue({ room: mockRoom, setRoomType: mockSetRoomType });
    const wrapper = shallow(<EndCallButton />);
    wrapper.simulate('click');
    expect(mockRoom.disconnect).toHaveBeenCalled();
  });

  it('should reset the roomType to null when clicked', () => {
    mockUseVideoContext.mockReturnValue({ room: mockRoom, setRoomType: mockSetRoomType });
    const wrapper = shallow(<EndCallButton />);
    wrapper.simulate('click');
    expect(mockSetRoomType).toHaveBeenCalledWith(null);
  });
});
