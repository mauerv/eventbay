import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from 'util/testUtils';
import useLocalVideoToggle from 'hooks/useLocalVideoToggle/useLocalVideoToggle';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import ToggleVideoButton from './ToggleVideoButton';

jest.mock('hooks/useLocalVideoToggle/useLocalVideoToggle');
jest.mock('hooks/useAnalytics/useAnalytics', () => () => ({ logEvent: jest.fn() }));
jest.mock('hooks/useFormatMessage/useFormatMessage');

const mockUseLocalVideoToggle = useLocalVideoToggle as jest.Mock<any>;
const mockUseFormatMessage = useFormatMessage as jest.Mock<any>;

describe('the ToggleVideoButton component', () => {
  it('should render correctly when video is enabled', () => {
    mockUseLocalVideoToggle.mockImplementation(() => [true, () => {}]);
    mockUseFormatMessage.mockImplementation(() => 'Mute Video');

    const wrapper = shallow(<ToggleVideoButton />);
    expect(wrapper.find('VideocamIcon').exists()).toBe(true);
    expect(wrapper.find('VideocamOffIcon').exists()).toBe(false);
    expect(wrapper.prop('title')).toBe('Mute Video');
  });

  it('should render correctly when video is disabled', () => {
    mockUseLocalVideoToggle.mockImplementation(() => [false, () => {}]);
    mockUseFormatMessage.mockImplementation(() => 'Unmute Video');

    const wrapper = shallow(<ToggleVideoButton />);
    expect(wrapper.find('VideocamIcon').exists()).toBe(false);
    expect(wrapper.find('VideocamOffIcon').exists()).toBe(true);
    expect(wrapper.prop('title')).toBe('Unmute Video');
  });

  it('should call the correct toggle function when clicked', () => {
    const mockFn = jest.fn();
    mockUseLocalVideoToggle.mockImplementation(() => [false, mockFn]);
    const wrapper = shallow(<ToggleVideoButton />);
    const button = findByTestAttr(wrapper, 'toggle-video-button');
    button.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
