<template>
  <div class="wrapper">
    <CommonButton
      :clickHandler="decreaseWeek"
      :label="'&lt;'"
    />
    <CommonButton
      :clickHandler="increaseWeek"
      :label="'&gt;'"
    />
    <CommonButton
      :clickHandler="setCurrentWeek"
      :label="'Today'"
    />
  </div>
</template>

<script>
import {
  getCurrentWeekStartDateMs,
  // transformMsToDate,
} from "@/utils/calculateWeek";
import { mapMutations } from "vuex";
import CommonButton from "./UIKit/CommonButton.vue";

export default {
  name: "NavBar",
  computed: {},

  methods: {
    ...mapMutations(["increaseWeek", "decreaseWeek", "setWeek"]),
    setCurrentWeek() {
      this.setWeek(getCurrentWeekStartDateMs());
    },
  },
  components: { CommonButton },
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  column-gap: 10px;

  & button {
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
