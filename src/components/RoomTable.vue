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
          :class="[
            'book',
            { right: new Date(currentWeek) > new Date(booking.start) },
            { left: new Date(currentWeek) < new Date(booking.end) },
          ]"
          :style="{
            width: `calc((100% / 7) * ${getDuration(booking.start, booking.end)})`,
            left: `calc(100% / 7 * ${getOffset(
              booking.start
            )} + (100% / 7) * ${checkInOutTime})`,
            bottom: `calc(100px * ${index})`,
          }"
        >
          <span>
            {{ booking.name }}
          </span>
          {{ index }}
        </div>
      </div>
    </div>

    <!-- <div
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
          :class="[
            'book',
            { right: new Date(currentWeek) > new Date(booking.start) },
          ]"
          :style="{
            width: `calc((100% / 7) * ${getDuration(booking.start, booking.end)})`,
            left: `calc(100% / 7 * ${getOffset(
              booking.start
            )} + (100% / 7) * ${checkInOutTime})`,
          }"
        >
          <span>
            {{ booking.name }}
          </span>
          {{ index }}
        </div>
      </div>
    </div> -->
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
    checkInOutTime() {
      return CHECK_IN_OUT_TIME / 24;
    },

    rooms() {
      // console.log(this.$store.getters.getRooms);
      return this.$store.getters.getRooms;
    },

    bookings() {
      console.log(this.$store.getters.getBookings);
      return this.$store.getters.getBookings;
    },

    roomWithBookings() {
      const rooms = this.$store.getters.getRooms;
      const bookings = this.$store.getters.getBookings;

      const arr = [];

      rooms.forEach(room => {
        const obj = { room, bookings: [] };

        for (let i = 0; i < bookings.length; i++) {
          if (bookings[i].roomDetails.name === room) {
            obj.bookings.push(bookings[i]);
          }
        }

        arr.push(obj);
      });

      console.log("bookings", bookings);
      console.log(arr);
      return arr;

      /*
        [
            {
                room: roomName,
                booking: [
                    {id:1 , name: 1},
                    {id:2 , name: 2}
                ]
            }
        ]

        */
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    currentWeek() {
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
  position: absolute;
  left: 0;
  bottom: 0;
  width: 300px;
  height: 70px;
  background-color: tomato;

  display: flex;
  align-items: center;
  justify-content: center;

  &.right {
    justify-content: flex-end;
  }

  &.left {
    justify-content: flex-start;
  }
}
</style>
