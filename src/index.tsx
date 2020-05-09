import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core/styles';
import { ThemeProvider } from 'styled-components';
import VideoApp from 'components/VideoApp/VideoApp';
import AudioApp from 'components/AudioOnlyEvent/AudioApp/AudioApp';
import AppStateProvider from 'state';
import AnalyticsProvider from 'components/AnalyticsProvider/AnalyticsProvider';
import UIStateProvider from 'components/UIStateProvider/UIStateProvider';
import ErrorTrackingProvider from 'components/ErrorTrackingProvider/ErrorTrackingProvider';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Register from 'components/Register/Register';
import PrivateRoute from 'components/PrivateRoute/PrivateRoute';
import LiveSupportProvider from 'components/LiveSupportProvider/LiveSupportProvider';
import theme from 'theme';
import 'types';
import { language, translationMessages } from 'translations';

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <StylesProvider injectFirst>
        <CssBaseline />
        <Router>
          <AppStateProvider>
            <ErrorTrackingProvider>
              <AnalyticsProvider>
                <UIStateProvider>
                  <LiveSupportProvider>
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
                          {process.env.REACT_APP_AUDIO_ONLY ? <AudioApp /> : <VideoApp />}
                        </PrivateRoute>
                        <Redirect to="/" />
                      </Switch>
                    </IntlProvider>
                  </LiveSupportProvider>
                </UIStateProvider>
              </AnalyticsProvider>
            </ErrorTrackingProvider>
          </AppStateProvider>
        </Router>
      </StylesProvider>
    </ThemeProvider>
  </MuiThemeProvider>,
  document.getElementById('root')
);
