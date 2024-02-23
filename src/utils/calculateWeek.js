const dayMs = 24 * 60 * 60 * 1000;
export const weekMs = dayMs * 7;

// export const getEndWeekDate = startWeekDate => {
//   const endWeekDate = new Date();
//   endWeekDate.setDate(startWeekDate.getDate() + 7);
//   return endWeekDate;
// };

export const getCurrentWeekStartDateMs = () => {
  const today = new Date();
  const weekDayNumber = today.getDay();

  const startWeekDate = new Date(Date.now() - weekDayNumber * dayMs);

  startWeekDate.setHours(0, 0, 0, 0);
  return startWeekDate.getTime();
};

export const transformMsToDate = ms => {
  return new Date(ms);
};

export const getPrevWeekStartDate = currentWeekStart => {
  const weekTimeMs = 7 * 24 * 60 * 60 * 1000;
  return new Date(currentWeekStart - weekTimeMs);
};

export const getNextWeekStartDate = currentWeekStart => {
  return new Date(currentWeekStart + weekMs);
};
