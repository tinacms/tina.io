import client from 'tina/__generated__/client';

export const fetchMeetingLinks = async () => {
  const meetingPeopleResponse = await client.queries.meetingLinks({ relativePath: 'meetingList.json' });
  const meetingPeopleData = meetingPeopleResponse.data.meetingLinks.meetingList[0].bookingCard.map((person) => ({
    name: person.name || '',
    description: person.description || '',
    image: person.image || '',
    url: person.url || '#'
  }));
  return meetingPeopleData;
};
