import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import App from 'App';
import AppStateProvider, { useAppState } from 'state';
import AnalyticsProvider from 'components/AnalyticsProvider/AnalyticsProvider';
import UIStateProvider from 'components/UIStateProvider/UIStateProvider';
import MediaDevicesProvider from 'components/MediaDevicesProvider/MediaDevicesProvider';
import ErrorTrackingProvider from 'components/ErrorTrackingProvider/ErrorTrackingProvider';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import ErrorDialog from 'components/ErrorDialog/ErrorDialog';
import Register from 'components/Register/Register';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import LiveSupportProvider from 'components/LiveSupportProvider/LiveSupportProvider';
import theme from 'theme';
import 'types';
import { VideoProvider } from 'components/VideoProvider';
import { language, translationMessages } from 'translations';

const VideoApp = () => {
  const { error, setError } = useAppState();

  return (
    <MediaDevicesProvider>
      <VideoProvider onError={setError}>
        <ErrorDialog dismissError={() => setError(null)} error={error} />
        <App />
      </VideoProvider>
    </MediaDevicesProvider>
  );
};

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <AppStateProvider>
            <ErrorTrackingProvider>
              <AnalyticsProvider>
                <LiveSupportProvider>
                  <UIStateProvider>
                    <IntlProvider
                      locale={language}
                      messages={translationMessages}
                      defaultLocale="en"
                    >
                      <Switch>
                        <Route exact path="/">
                          <Register />
                        </Route>
                        <PrivateRoute path="/lobby">
                          <VideoApp />
                        </PrivateRoute>
                        <Redirect to="/" />
                      </Switch>
                    </IntlProvider>
                  </UIStateProvider>
                </LiveSupportProvider>
              </AnalyticsProvider>
            </ErrorTrackingProvider>
          </AppStateProvider>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
