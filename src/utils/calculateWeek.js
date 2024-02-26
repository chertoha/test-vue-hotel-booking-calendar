export const dayMs = 24 * 60 * 60 * 1000;
export const weekMs = dayMs * 7;

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

export const getEndWeekDate = currentWeekStartMs => {
  const endDate = new Date(currentWeekStartMs + dayMs * 6);
  endDate.setHours(23, 59, 59, 999);
  return endDate;
};

export const transformToISODate = ms => {
  return new Date(ms).toISOString().split("T")[0];
};

export const createWeekDaysList = startDateMs => {
  return Array.from(Array(7)).map(
    (_, i) => new Date(startDateMs + dayMs * i).toISOString().split("T")[0]
  );
};

export const createDateMs = dateString => {
  return new Date(dateString).getTime();
};
