// import bookings from "@/data/bookings.json";
import bookings from "@/data/testBookings.json";
import { getEndWeekDate, transformMsToDate } from "@/utils/calculateWeek";

export const getRoomsFromBookings = () => {
  const roomsSet = new Set();
  bookings.forEach(({ roomDetails: { name } }) => roomsSet.add(name));
  return [...roomsSet];
};

export const getBookingsbyWeek = startWeekDateMs => {
  const startWeekDate = transformMsToDate(startWeekDateMs);
  const endWeekDate = getEndWeekDate(startWeekDateMs);

  //   console.log(startWeekDate);
  //   console.log(endWeekDate);

  return bookings.filter(
    ({ start, end }) =>
      new Date(end) >= startWeekDate && new Date(start) <= endWeekDate
  );
};
