import React from 'react';
import { shallow } from 'enzyme';
import { Participant } from 'twilio-video';

import ParticipantListItem from './ParticipantListItem';
import { findByTestAttr } from 'util/testUtils';

const defaultProps = {
  participant: { identity: 'mauro' } as Participant,
};

const setup = (customProps = {}) => {
  const props = { ...defaultProps, ...customProps };
  const wrapper = shallow(<ParticipantListItem {...props} />);
  return wrapper;
};

describe('the ParticipantListItem component', () => {
  test('renders without crashing', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'participant-list-item');
    expect(component.length).toBe(1);
  });

  test('displays the correct participant identity', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'participant-list-item');
    expect(component.text().includes(defaultProps.participant.identity)).toBe(true);
  });
});
