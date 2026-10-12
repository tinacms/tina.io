'use server';

import client from 'tina/__generated__/client';

export const fetchMeetingLinks = async () => {
  try {
    const meetingPeopleResponse = await client.queries.meetingLinks({
      relativePath: 'meetingList.json',
    });

    if (!meetingPeopleResponse?.data?.meetingLinks?.bookingCard) {
      console.error('Meeting links data is missing or malformed');
      return [];
    }

    const meetingPeopleData =
      meetingPeopleResponse.data.meetingLinks.bookingCard.map((person) => ({
        name: person.name || '',
        description: person.description || '',
        image: person.image || '',
        url: person.url || '#',
      }));
    return meetingPeopleData;
  } catch (error) {
    console.error('Error fetching meeting links:', error);
    return [];
  }
};
