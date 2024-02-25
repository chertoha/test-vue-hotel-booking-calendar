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
      v-for="{ room, bookings } in roomWithBookings"
      class="row tab-row"
      :style="{ height: `calc(100px * ${bookings.length})` }"
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
          v-for="(booking, index) in bookings"
          :key="booking.name"
          :class="['book']"
          :style="{
            width: `calc((100% / 7) * ${getDuration(booking.start, booking.end)})`,

            left: `calc(100% / 7 * ${getOffset(
              booking.start
            )} + (100% / 7) * ${checkInOutTime})`,

            bottom: booking.isOverlapped && `calc(100px * ${index})`,

            paddingLeft:
              getOffset(booking.start) < 0
                ? `calc(100% / 7 * ${
                    getOffset(booking.start) * -1
                  } - (100% / 7) * ${checkInOutTime})`
                : `20px`,

            paddingRight:
              getEndOffset(booking.end) < 0
                ? `calc(100% / 7 * ${
                    getEndOffset(booking.end) * -1
                  } + (100% / 7) * ${checkInOutTime})`
                : `20px`,
          }"
        >
          <span>
            {{ booking.name }}
          </span>
          <!-- {{ index }} -->
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
  weekMs,
} from "@/utils/calculateWeek";
import { mapActions } from "vuex";
import { CHECK_IN_OUT_TIME } from "@/utils/config";
export default {
  name: "RoomTable",

  data: () => {
    return {};
  },

  computed: {
    checkInOutTime() {
      return CHECK_IN_OUT_TIME / 24;
    },

    rooms() {
      // console.log(this.$store.getters.getRooms);
      return this.$store.getters.getRooms;
    },

    bookings() {
      // console.log(this.$store.getters.getBookings);
      return this.$store.getters.getBookings;
    },

    //Refactor needed
    roomWithBookings() {
      const rooms = this.$store.getters.getRooms;
      const bookings = this.$store.getters.getBookings;

      const arr = [];

      rooms.forEach(room => {
        const obj = { room, bookings: [] };

        for (let i = 0; i < bookings.length; i++) {
          if (bookings[i].roomDetails.name === room) {
            obj.bookings.push({ isOverlapped: false, ...bookings[i] });
          }
        }

        if (obj.bookings.length > 1) {
          obj.bookings.forEach((booking, i, arr) => {
            for (let j = 0; j < arr.length; j++) {
              if (i === j) continue;
              if (booking.start >= arr[j].end) continue;
              if (booking.end <= arr[j].start) continue;
              booking.isOverlapped = true;
            }
          });

          obj.bookings.sort(({ isOverlapped }) => isOverlapped && -1);
        }

        arr.push(obj);
      });

      // console.log("bookings", bookings);
      console.log(arr);
      return arr;
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    currentWeek() {
      // console.log(this.$store.getters.getWeek);
      return this.$store.getters.getWeek;
    },

    today() {
      return transformToISODate(new Date());
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
      const offset = (startDateMs - this.$store.getters.getWeek) / dayMs;
      // console.log(this.$store.getters.getWeek);
      return offset;
    },

    getEndOffset(end) {
      const endDateMs = new Date(end).getTime();
      const offset = (this.$store.getters.getWeek + weekMs - endDateMs) / dayMs;
      // console.log(this.$store.getters.getWeek);
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
  /* min-height: 100px; */
}

.tab-row {
  min-height: 100px;
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
  box-sizing: border-box;
  position: absolute;
  /* padding-left: 300px; */
  /* padding-left: 20px; */
  /* padding-right: 20px; */
  left: 0;
  bottom: 0;
  width: 300px;
  height: 70px;
  background-color: tomato;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 15px;
  border-right: 3px solid white;

  &.right {
    justify-content: flex-end;
  }

  &.left {
    justify-content: flex-start;
  }
}
</style>
