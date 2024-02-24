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

    <!-- {{ week }} -->
    <!-- {{ bookings }} -->
    <!-- {{ this.$store.getters.getBookings }} -->

    <div class="grid-component">
      <div class="row">
        <div class="col">col</div>
        <div class="grid">
          <div
            class="cell"
            v-for="day in week"
            :key="day"
          >
            {{ day }}
          </div>
        </div>
      </div>

      <div
        class="row"
        v-for="room in rooms"
        :key="room.id"
      >
        <div class="col">{{ room.name }}</div>
        <div class="grid">
          <div
            class="cell"
            v-for="day in week"
            :key="day"
          ></div>

          <div class="book"></div>
        </div>
      </div>
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

<style lang="scss">
.row {
  display: grid;
  grid-template-columns: 100px 1fr;

  width: 100%;
  min-height: 70px;
}

.grid {
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.col {
  border: 1px solid gray;
}

.cell {
  border: 1px solid gray;
}

.book {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 40px;
  background-color: tomato;
}
</style>
