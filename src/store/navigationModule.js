import { getCurrentWeekStartDateMs, weekMs } from "@/utils/calculateWeek";

export default {
  state: {
    weekStart: getCurrentWeekStartDateMs(),
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
