import { NextResponse } from 'next/server';
import client from 'tina/__generated__/client';

export async function GET() {
  try {
    const meetingPeopleResponse = await client.queries.meetingLinks({
      relativePath: 'meetingList.json',
    });

    if (!meetingPeopleResponse?.data?.meetingLinks?.bookingCard) {
      return NextResponse.json(
        { error: 'Meeting links data is missing or malformed' },
        { status: 500 },
      );
    }

    const meetingPeople =
      meetingPeopleResponse.data.meetingLinks.bookingCard.map((person) => ({
        name: person.name || '',
        description: person.description || '',
        image: person.image || '',
        url: person.url || '#',
      }));

    return NextResponse.json({ meetingPeople, error: null });
  } catch (error) {
    console.error('Error fetching meeting links:', error);
    return NextResponse.json(
      {
        error: 'Failed to load meeting links. Please try again later.',
        meetingPeople: [],
      },
      { status: 500 },
    );
  }
}
