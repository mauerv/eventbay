import React from 'react';
import { shallow } from 'enzyme';

import Controls from './Controls';
import useIsUserActive from './useIsUserActive/useIsUserActive';
import useRoomState from 'hooks/useRoomState/useRoomState';
import useVideoContext from 'hooks/useVideoContext/useVideoContext';

jest.mock('./useIsUserActive/useIsUserActive');
jest.mock('hooks/useRoomState/useRoomState');
jest.mock('hooks/useVideoContext/useVideoContext');

const mockIsUserActive = useIsUserActive as jest.Mock<boolean>;
const mockUseRoomState = useRoomState as jest.Mock<any>;
const mockUseVideoContext = useVideoContext as jest.Mock<any>;
mockUseVideoContext.mockImplementation(() => ({ roomType: 'collaboration' }));

describe('the Controls component', () => {
  describe('when the user is active', () => {
    mockIsUserActive.mockImplementation(() => true);

    it('should have the "active" class', () => {
      mockUseRoomState.mockImplementation(() => 'disconnected');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('div').prop('className')).toContain('showControls');
    });

    it('should not render the ToggleScreenShare, ToggleChat and EndCall buttons when not connected to a room', () => {
      mockUseRoomState.mockImplementation(() => 'disconnected');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('ToggleScreenShareButton').exists()).toBe(false);
      expect(wrapper.find('EndCallButton').exists()).toBe(false);
      expect(wrapper.find('ToggleChatButton').exists()).toBe(false);
    });

    it('should render the ToggleScreenShare and EndCall buttons when connected to a room', () => {
      mockUseRoomState.mockImplementation(() => 'connected');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('ToggleScreenShareButton').exists()).toBe(true);
      expect(wrapper.find('EndCallButton').exists()).toBe(true);
      expect(wrapper.find('ToggleChatButton').exists()).toBe(true);
    });

    it('should not render the ToggleScreenShare button when connected to a grid room', () => {
      mockUseRoomState.mockImplementation(() => 'connected');
      mockUseVideoContext.mockImplementationOnce(() => ({ roomType: 'grid' }));
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('ToggleScreenShareButton').exists()).toBe(false);
      expect(wrapper.find('EndCallButton').exists()).toBe(true);
      expect(wrapper.find('ToggleChatButton').exists()).toBe(true);
    });

    it('should disable the ToggleAudio, ToggleVideo, and ToggleScreenShare buttons when reconnecting to a room', () => {
      mockUseRoomState.mockImplementation(() => 'reconnecting');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('ToggleAudioButton').prop('disabled')).toBe(true);
      expect(wrapper.find('ToggleVideoButton').prop('disabled')).toBe(true);
      expect(wrapper.find('ToggleScreenShareButton').prop('disabled')).toBe(true);
      expect(wrapper.find('ToggleChatButton').prop('disabled')).toBe(true);
    });
  });

  describe('when the user is inactive', () => {
    mockIsUserActive.mockImplementation(() => false);

    it('should have the "active" class when the user is not connected to a room', () => {
      mockUseRoomState.mockImplementation(() => 'disconnected');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('div').prop('className')).toContain('showControls');
    });

    it('should not have the "active" class when the user is connected to a room', () => {
      mockUseRoomState.mockImplementation(() => 'connected');
      const wrapper = shallow(<Controls />);
      expect(wrapper.find('div').prop('className')).not.toContain('showControls');
    });
  });
});
