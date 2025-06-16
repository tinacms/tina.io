import { format } from 'date-fns';

const getOrdinalSuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

const shortDateFormat = (start, end?): string => {
  //Gets the start date in the event time, which is "UTC" from how it's stored
  const startDay = `${
    new Date(start).getDate() + getOrdinalSuffix(new Date(start).getDate())
  }`;
  const startMonth = format(new Date(start), 'MMM');
  //Gets the end date in the event time, which is "UTC" from how it's stored
  const endDateAndHyphen = end
    ? ` - ${
        new Date(end).getDate() + getOrdinalSuffix(new Date(end).getDate())
      }`
    : '';
  const endMonth = end ? format(new Date(end), 'MMM') : '';
  //Formats the dates into a single string
  return `${startDay} ${
    startMonth == endMonth ? '' : startMonth
  }${endDateAndHyphen} ${endMonth ?? startMonth}`;
};

const parseStartTime = (startTime: string | number): Date => {
  let startTimeDate = new Date(startTime);

  if (startTimeDate.toString() === 'Invalid Date') {
    if (typeof startTime === 'string' && startTime.includes(':')) {
      const [hours, minutes] = startTime.split(':').map(Number);
      if (!isNaN(hours) && !isNaN(minutes)) {
        startTimeDate = new Date();
        startTimeDate.setHours(hours, minutes, 0, 0);
      }
    } else {
      startTimeDate = new Date(+startTime);
    }
  }

  return startTimeDate;
};

const calculateEventTimes = (
  cardItem: any,
  useLocalTimezone: boolean = true
) => {
  const startTimeDate = parseStartTime(cardItem.startTime);
  const startTime =
    startTimeDate.getUTCHours() + startTimeDate.getUTCMinutes() / 60;

  // Calculate start date in UTC
  const startDateUTC = new Date(Date.parse(cardItem.startDate));
  startDateUTC.setUTCMinutes(
    startDateUTC.getUTCMinutes() + cardItem.timezone * -60 + startTime * 60
  );

  // Calculate end date in UTC
  const endDateUTC = new Date(
    Date.parse(cardItem.endDate ?? cardItem.startDate)
  );
  endDateUTC.setUTCMinutes(
    endDateUTC.getUTCMinutes() + cardItem.timezone * -60 + 24 * 60
  );

  if (useLocalTimezone) {
    const userTimezone = getUserTimezoneOffset();
    const timezoneDiff = userTimezone - cardItem.timezone;

    // Convert start date to local timezone
    const localStartDate = new Date(startDateUTC);
    localStartDate.setHours(localStartDate.getHours() + timezoneDiff);

    // Convert end date to local timezone
    const localEndDate = new Date(endDateUTC);
    localEndDate.setHours(localEndDate.getHours() + timezoneDiff);

    return {
      startDateUTC: localStartDate,
      endDateUTC: localEndDate,
      originalStartDate: startDateUTC,
      originalEndDate: endDateUTC,
    };
  }

  return {
    startDateUTC,
    endDateUTC,
    originalStartDate: startDateUTC,
    originalEndDate: endDateUTC,
  };
};

const calculateEventStatus = (startDateUTC: Date, endDateUTC: Date) => {
  const hoursUntilEvent = Math.ceil(
    (startDateUTC.getTime() - new Date().getTime()) / 36e5
  );
  const hoursUntilEventEnd = Math.ceil(
    (endDateUTC.getTime() - new Date().getTime()) / 36e5
  );

  return {
    hoursUntilEvent,
    hoursUntilEventEnd,
    isLiveOrPastEvent: hoursUntilEvent < 0,
    isLiveEvent: hoursUntilEvent <= 0 && hoursUntilEventEnd > 0,
  };
};

const formatTimeString = (timeString: string): string => {
  if (timeString.includes('T')) {
    const timePart = timeString.split('T')[1].split(':').slice(0, 2).join(':');
    const [hours, minutes] = timePart.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  } else if (timeString.includes(':')) {
    const [hours, minutes] = timeString.split(':').map(Number);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  }
  return '';
};

const formatLocalDateTime = (date: Date, timezone: number): string => {
  const localDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const localHours = date.getHours();
  const localMinutes = date.getMinutes();
  const localAmpm = localHours >= 12 ? 'PM' : 'AM';
  const localHours12 = localHours % 12 || 12;
  return `${localDate} ${localHours12}:${localMinutes
    .toString()
    .padStart(2, '0')} ${localAmpm}`;
};

const getUserTimezoneOffset = (): number => {
  return -new Date().getTimezoneOffset() / 60;
};

const convertToLocalTimezone = (date: Date, eventTimezone: number): Date => {
  const userTimezone = getUserTimezoneOffset();
  const timezoneDiff = userTimezone - eventTimezone;

  const localDate = new Date(date);
  localDate.setHours(localDate.getHours() + timezoneDiff);
  return localDate;
};

const formatEventDate = (
  cardItem: any,
  useLocalTimezone: boolean = true
): string => {
  if (!cardItem.startDate) return '';

  let timeString = '';
  let localDateTimeString = '';
  let localEndDateTimeString = '';

  if (cardItem.startTime) {
    timeString = formatTimeString(cardItem.startTime);

    // Convert start time to local time
    const eventDate = new Date(cardItem.startDate);
    const [hours, minutes] = cardItem.startTime.includes('T')
      ? cardItem.startTime.split('T')[1].split(':').map(Number)
      : cardItem.startTime.split(':').map(Number);

    // Set the time in the event's timezone
    eventDate.setUTCHours(hours - cardItem.timezone, minutes, 0, 0);

    // Convert to user's local timezone if requested
    const displayDate = useLocalTimezone
      ? convertToLocalTimezone(eventDate, cardItem.timezone)
      : eventDate;

    localDateTimeString = formatLocalDateTime(displayDate, cardItem.timezone);

    // Convert end date to local time if end date exists
    if (cardItem.endDate) {
      const endDate = new Date(cardItem.endDate);
      endDate.setUTCHours(23 - cardItem.timezone, 59, 0, 0);

      // Convert to user's local timezone if requested
      const displayEndDate = useLocalTimezone
        ? convertToLocalTimezone(endDate, cardItem.timezone)
        : endDate;

      localEndDateTimeString = formatLocalDateTime(
        displayEndDate,
        cardItem.timezone
      );
    }
  }

  return shortDateFormat(localDateTimeString, localEndDateTimeString);
};

const calculateEventYear = (startDateUTC: Date, endDateUTC?: Date): number => {
  if (!endDateUTC) {
    return new Date(startDateUTC).getFullYear();
  }
  return endDateUTC.getFullYear();
};

export {
  calculateEventStatus,
  calculateEventTimes,
  calculateEventYear,
  formatEventDate,
};
