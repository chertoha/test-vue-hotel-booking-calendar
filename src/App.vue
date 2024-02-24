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
    <!-- {{ currentWeek }} -->
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

          <div
            v-for="(booking, index) in getBookingsByRoom(room.id)"
            :key="index"
            class="book"
            :style="{
              width: `calc((100% / 7) * ${getDuration(booking.start, booking.end)})`,
              left: `calc(100% / 7 * ${getOffset(
                booking.start
              )} + (100% / 7) * ${checkInOutTime})`,
            }"
          >
            <!-- {{ getOffset(booking.start) }} -->
            {{ getDuration(booking.start, booking.end) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { createWeekDaysList, dayMs } from "./utils/calculateWeek";
import { mapActions } from "vuex";
import { CHECK_IN_OUT_TIME } from "@/utils/config";

export default {
  name: "App",
  data: () => ({
    // booking: {
    //   id: 976775,
    //   name: "Zolly Feasby",
    //   phone: "884-184-7013",
    //   email: "zfeasby27@last.fm",
    //   typeOfApartments: "חדר יחיד",
    //   guestInfo: {
    //     adults: 7,
    //     children: 6,
    //   },
    //   start: "2024-02-18",
    //   duration: 8,
    //   timed: true,
    //   height: 39,
    //   type: "unavailable",
    //   roomDetails: {
    //     id: 4,
    //     name: "Superior Room",
    //   },
    //   end: "2024-02-23",
    // },
  }),
  components: {
    NavBar,
  },

  computed: {
    checkInOutTime() {
      return CHECK_IN_OUT_TIME / 24;
    },

    rooms() {
      return this.$store.getters.getRooms;
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    bookings() {
      // console.log(this.$store.getters.getBookings);
      return this.$store.getters.getBookings;
    },

    currentWeek() {
      return this.$store.getters.getWeek;
    },
  },

  mounted() {
    this.fetchRooms();
    this.fetchWeekBookings(this.$store.getters.getWeek);
  },

  watch: {
    week: "updateBookings",
  },

  methods: {
    ...mapActions(["fetchRooms", "fetchWeekBookings"]),

    updateBookings() {
      this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);
    },

    getDuration(start, end) {
      const startDateMs = new Date(start).getTime();
      const endDateMs = new Date(end).getTime();

      return (endDateMs - startDateMs) / dayMs;
    },

    getOffset(start) {
      const startDateMs = new Date(start).getTime();
      const offset = (startDateMs - this.currentWeek) / dayMs;
      return offset;
    },

    getBookingsByRoom(roomId) {
      console.log(roomId);

      return this.bookings.filter(({ roomDetails }) => {
        return roomDetails.id.toString() === roomId.toString();
      });
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
  overflow: hidden;
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
