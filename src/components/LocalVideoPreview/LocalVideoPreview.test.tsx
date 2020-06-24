import React from 'react';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';

import LocalVideoPreview from './LocalVideoPreview';
import { IVideoContext } from 'components/VideoProvider';
import useMediaContext from 'hooks/useMediaContext/useMediaContext';
import theme from 'theme';

jest.mock('hooks/useMediaContext/useMediaContext');
jest.mock('components/UIStateProvider/useUIState/useUIState', () => () => jest.fn());
jest.mock('hooks/useMediaDevices/useMediaDevices', () => () => jest.fn());

const mockedVideoContext = useMediaContext as jest.Mock<IVideoContext>;

const setup = () => {
  return mount(
    <IntlProvider locale="en">
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <StylesProvider>
            <LocalVideoPreview />
          </StylesProvider>
        </ThemeProvider>
      </MuiThemeProvider>
    </IntlProvider>
  );
};

describe('the LocalVideoPreview component', () => {
  it('it should render a VideoTrack component when there is a "camera" track', () => {
    mockedVideoContext.mockImplementation(() => {
      return {
        localTracks: [{ name: 'camera', attach: jest.fn(), detach: jest.fn() }],
      } as any;
    });
    const wrapper = setup();
    expect(wrapper.find('video').exists()).toBe(true);
  });
  it('should render null when there are no "camera" tracks', () => {
    mockedVideoContext.mockImplementation(() => {
      return {
        localTracks: [{ name: 'microphone', attach: jest.fn(), detach: jest.fn() }],
      } as any;
    });
    const wrapper = setup();
    expect(wrapper.find('video').exists()).toBe(false);
  });
});
