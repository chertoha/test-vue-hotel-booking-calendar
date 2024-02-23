<template>
  <div id="app">
    <NavBar />

    <!-- <div>
      <p
        v-for="room in rooms"
        :key="room.id"
      >
        <span>{{ room.id }}</span> <span> {{ room.name }}</span>
      </p>
    </div> -->

    {{ week }}
    <!-- {{ bookings }} -->
    <!-- {{ this.$store.getters.getBookings }} -->

    <div>
      <table class="table">
        <thead>
          <tr>
            <th
              v-for="day in week"
              :key="day"
            >
              {{ day }}
            </th>
          </tr>
        </thead>

        <tbody></tbody>
      </table>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { createWeekDaysList } from "./utils/calculateWeek";
import { mapActions } from "vuex";

export default {
  name: "App",
  data: () => ({}),
  components: {
    NavBar,
  },

  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    bookings() {
      return this.$store.getters.getBookings;
    },
  },

  mounted() {
    // this.$store.dispatch("fetchRooms");
    // this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);

    this.fetchRooms();
    this.fetchWeekBookings(this.$store.getters.getWeek);
  },

  watch: {
    week: "updateBookings",
  },

  methods: {
    // ...mapMutations(["increaseWeek", "decreaseWeek", "setWeek"]),
    ...mapActions(["fetchRooms", "fetchWeekBookings"]),

    updateBookings() {
      this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);
    },
  },
};
</script>

<style>
.table {
  border: 1px solid grey;
}
</style>
