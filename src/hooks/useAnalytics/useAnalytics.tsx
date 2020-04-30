import { useContext } from 'react';
import { AnalyticsContext } from 'components/AnalyticsProvider/AnalyticsProvider';

export default function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}
