import { getRoomsFromBookings } from "@/services/api";

export default {
  state: {
    rooms: [],
  },

  mutations: {
    setRooms(state, payload) {
      state.rooms = payload;
    },
  },

  getters: {
    getRooms: state => state.rooms,
  },

  actions: {
    fetchRooms(context) {
      const data = getRoomsFromBookings();
      context.commit("setRooms", data);
    },
  },
};
