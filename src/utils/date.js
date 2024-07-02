export function getSundayOfSameWeek(date) {
  const currDate = new Date(date);
  const dayOfWeek = currDate.getDay();

  // Calculate the difference in days to Sunday
  const daysToSunday = (7 - dayOfWeek) % 7;

  const sunday = new Date(currDate);
  sunday.setDate(currDate.getDate() + daysToSunday);

  return sunday;
}