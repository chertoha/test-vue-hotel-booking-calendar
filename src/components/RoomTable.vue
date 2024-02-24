<template>
  <div class="grid-component">
    <div class="row">
      <div class="col">col</div>
      <div class="grid">
        <div
          :class="['cell', { today: day === today }]"
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
      :key="room"
    >
      <div class="col">{{ room }}</div>
      <div class="grid">
        <div
          :class="['cell', { today: day === today }]"
          class="cell"
          v-for="day in week"
          :key="day"
        ></div>

        <div
          v-for="(booking, index) in getBookingsByRoom(room)"
          :key="index"
          class="book"
          :style="{
            width: `calc((100% / 7) * ${getDuration(booking.start, booking.end)})`,
            left: `calc(100% / 7 * ${getOffset(
              booking.start
            )} + (100% / 7) * ${checkInOutTime})`,
          }"
        >
          <!-- {{ getDuration(booking.start, booking.end) }} -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createWeekDaysList,
  dayMs,
  transformToISODate,
} from "@/utils/calculateWeek";
import { mapActions } from "vuex";
import { CHECK_IN_OUT_TIME } from "@/utils/config";
export default {
  name: "RoomTable",

  computed: {
    today() {
      return transformToISODate(new Date());
    },

    checkInOutTime() {
      return CHECK_IN_OUT_TIME / 24;
    },

    rooms() {
      // console.log(this.$store.getters.getRooms);
      return this.$store.getters.getRooms;
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    bookings() {
      console.log(this.$store.getters.getBookings);
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

    getBookingsByRoom(roomName) {
      return this.bookings.filter(({ roomDetails }) => {
        return roomDetails.name === roomName;
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

  &.today {
    background-color: rgb(204, 239, 204);
  }
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
