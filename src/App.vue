<template>
  <div id="app">
    <NavBar />

    <div>
      <p
        v-for="room in rooms"
        :key="room.id"
      >
        <span>{{ room.id }}</span> <span> {{ room.name }}</span>
      </p>
    </div>

    {{ week }}
    {{ bookings }}
    <!-- {{ this.$store.getters.getBookings }} -->
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

  computed: {
    rooms() {
      return this.$store.getters.getRooms;
    },

    week() {
      return this.$store.getters.getWeek;
    },

    bookings() {
      return this.$store.getters.getBookings;
    },
  },

  mounted() {
    this.$store.dispatch("fetchRooms");
    this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);
  },

  watch: {
    week: "updateBookings",
  },

  methods: {
    // ...mapMutations(["increaseWeek", "decreaseWeek", "setWeek"]),

    updateBookings() {
      this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);
    },
  },
};
</script>

<style></style>
