import React from 'react';
import { shallow } from 'enzyme';

import { findByTestAttr } from 'util/testUtils';
import useLocalAudioToggle from 'hooks/useLocalAudioToggle/useLocalAudioToggle';
import useFormatMessage from 'hooks/useFormatMessage/useFormatMessage';
import ToggleAudioButton from './ToggleAudioButton';

jest.mock('hooks/useLocalAudioToggle/useLocalAudioToggle');
jest.mock('hooks/useAnalytics/useAnalytics', () => () => ({ logEvent: jest.fn() }));
jest.mock('hooks/useFormatMessage/useFormatMessage');

const mockUseLocalAudioToggle = useLocalAudioToggle as jest.Mock<any>;
const mockUseFormatMessage = useFormatMessage as jest.Mock<any>;

describe('the ToggleAudioButton component', () => {
  it('should render correctly when audio is enabled', () => {
    mockUseLocalAudioToggle.mockImplementation(() => [true, () => {}]);
    mockUseFormatMessage.mockImplementation(() => 'Mute Audio');
    const wrapper = shallow(<ToggleAudioButton />);

    expect(wrapper.find('MicIcon').exists()).toBe(true);
    expect(wrapper.find('MicOffIcon').exists()).toBe(false);
    expect(
      wrapper
        .find('WithStyles(ForwardRef(Tooltip))')
        .at(0)
        .prop('title')
    ).toBe('Mute Audio');
  });

  it('should render correctly when audio is disabled', () => {
    mockUseLocalAudioToggle.mockImplementation(() => [false, () => {}]);
    mockUseFormatMessage.mockImplementation(() => 'Unmute Audio');
    const wrapper = shallow(<ToggleAudioButton />);
    expect(wrapper.find('MicIcon').exists()).toBe(false);
    expect(wrapper.find('MicOffIcon').exists()).toBe(true);
    expect(
      wrapper
        .find('WithStyles(ForwardRef(Tooltip))')
        .at(0)
        .prop('title')
    ).toBe('Unmute Audio');
  });

  it('should call the correct toggle function when clicked', () => {
    const mockFn = jest.fn();
    mockUseLocalAudioToggle.mockImplementation(() => [false, mockFn]);
    const wrapper = shallow(<ToggleAudioButton />);
    const button = findByTestAttr(wrapper, 'toggle-audio-button');
    button.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
