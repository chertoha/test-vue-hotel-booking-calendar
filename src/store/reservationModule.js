import { getBookingsbyWeek } from "@/services/api";

export default {
  state: {
    bookings: [],
  },

  mutations: {
    setBookings(state, payload) {
      state.bookings = payload;
    },
  },

  getters: {
    getBookings: state => state.bookings,
  },

  actions: {
    fetchWeekBookings(context, payload) {
      const data = getBookingsbyWeek(payload);

      context.commit("setBookings", data);
    },
  },
};
