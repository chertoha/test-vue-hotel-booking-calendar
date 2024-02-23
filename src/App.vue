<template>
  <div id="app">
    <NavBar />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

// import { mapMutations } from "vuex";

export default {
  name: "App",
  data: () => ({}),
  components: {
    NavBar,
  },

  computed: {},

  mounted() {},

  methods: {
    // ...mapMutations(["increaseWeek", "decreaseWeek", "setWeek"]),
    // calcWeek() {
    //   const startWeekDate = getCurrentWeekStartDateMs();
    //   // const endWeekDate = getEndWeekDate(startWeekDate);
    //   // const prevWeekDate = new Date(
    //   //   startWeekDate.getTime() - 7 * 24 * 60 * 60 * 1000
    //   // );
    //   console.log(getPrevWeekStartDate(startWeekDate));
    // },
  },
};
</script>

<style></style>
