<template>
  <div>
    <div>
      <button @click="decreaseWeek">&lt;</button>
      <button @click="increaseWeek">&gt;</button>
      <button @click="setCurrentWeek">Today</button>
    </div>

    <!-- {{ $store.getters.getWeek }} -->
    {{ week }}
  </div>
</template>

<script>
import {
  getCurrentWeekStartDateMs,
  transformMsToDate,
} from "@/utils/calculateWeek";
import { mapMutations } from "vuex";

export default {
  name: "NavBar",

  computed: {
    week() {
      return transformMsToDate(this.$store.getters.getWeek);
    },
  },

  mounted() {
    // this.setCurrentWeek();
  },

  methods: {
    ...mapMutations(["increaseWeek", "decreaseWeek", "setWeek"]),

    setCurrentWeek() {
      this.setWeek(getCurrentWeekStartDateMs());
    },
  },
};
</script>
