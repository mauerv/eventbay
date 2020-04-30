import React from 'react';
import { shallow } from 'enzyme';
import { Participant } from 'twilio-video';

import ParticipantList from './ParticipantList';

describe('the ParticipantList component', () => {
  test('renders 3 ParticipantListItem with 3 participants', () => {
    const participants = [
      { identity: 'first', sid: '1' },
      { identity: 'second', sid: '2' },
      { identity: 'third', sid: '3' },
    ] as Participant[];
    const wrapper = shallow(<ParticipantList participants={participants} />);
    const participantComponents = wrapper.children();

    expect(participantComponents.length).toBe(participants.length);
  });
  test('renders no ParticipantListItem with an empty participant array', () => {
    const participants = [] as Participant[];
    const wrapper = shallow(<ParticipantList participants={participants} />);
    const participantComponents = wrapper.children();
    expect(participantComponents.length).toBe(0);
  });
});
