import Vue from "vue";
import Vuex from "vuex";
import navigationModule from "./navigationModule";
import reservationModule from "./reservationModule";
import roomsModule from "./roomsModule";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { navigationModule, reservationModule, roomsModule },
  plugins: [createPersistedState()],
});
