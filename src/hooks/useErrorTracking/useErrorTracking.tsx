import { useContext } from 'react';
import { ErrorTrackingContext } from 'components/ErrorTrackingProvider/ErrorTrackingProvider';

export default function useErrorTracking() {
  const context = useContext(ErrorTrackingContext);
  if (!context) {
    throw new Error('useErrorTracking must be used within a ErrorTrackingProvider');
  }
  return context;
}
