import Vue from "vue";
import Vuex from "vuex";
import navigationModule from "./navigationModule";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { navigationModule },
});
