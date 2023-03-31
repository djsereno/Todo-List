import { format, isToday, isTomorrow, isYesterday } from 'date-fns';

const formatDate = (date) => {
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
