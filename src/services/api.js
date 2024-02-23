import bookings from "@/data/bookings.json";

export const getRoomsFromBookings = () => {
  const roomsObject = bookings.reduce(
    (rooms, { roomDetails: { id, name } }) => {
      return {
        ...rooms,
        [id]: name,
      };
    },
    {}
  );

  return Object.keys(roomsObject).map(id => ({
    id,
    name: roomsObject[id],
  }));
};
