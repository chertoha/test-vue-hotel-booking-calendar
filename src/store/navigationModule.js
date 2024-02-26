import { weekMs } from "@/utils/calculateWeek";

export default {
  state: {
    weekStart: 0,
  },

  mutations: {
    setWeek(state, payload) {
      state.weekStart = payload;
    },

    increaseWeek(state) {
      state.weekStart += weekMs;
    },

    decreaseWeek(state) {
      state.weekStart -= weekMs;
    },
  },

  getters: {
    getWeek: state => state.weekStart,
  },
  actions: {},
};
