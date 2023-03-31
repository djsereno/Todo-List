import { parse, format, isToday, isTomorrow, isYesterday } from 'date-fns';

const formatDate = (dateString) => {
  const date = parse(dateString, 'yyyy-MM-dd', new Date());
  let newDateString;

  if (isToday(date)) {
    newDateString = 'Today';
  } else if (isTomorrow(date)) {
    newDateString = 'Tomorrow';
  } else if (isYesterday(date)) {
    newDateString = 'Yesterday';
  } else {
    newDateString = format(date, 'EEE, MMM d');
  }

  return newDateString;
};

export default formatDate;
