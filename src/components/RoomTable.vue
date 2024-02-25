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
      :style="{ height: `calc(100px * ${countOverlappedBookings(bookings)})` }"
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

        <!--  -->
        <BookingBar
          @emitPopup="openPopup"
          v-for="(booking, index) in bookings"
          :key="booking.name"
          :booking="booking"
          :index="index"
        />
      </div>
    </div>

    <!-- <div
      v-if="isPopupOpen"
      class="backdrop"
      @click="closePopup"
    > -->
    <div
      class="popup"
      v-if="isPopupOpen"
      :style="{
        left: `${popupCoords.x}px`,
        top: `${popupCoords.y}px`,
        transform: `${popupCoords.left ? 'translateX(0)' : 'translateX(-100%)'} ${
          popupCoords.top ? 'translateY(0)' : 'translateY(-100%)'
        }`,
      }"
    >
      {{ currentBooking }}
    </div>
  </div>
  <!-- </div> -->
</template>

<script>
import {
  createWeekDaysList,
  // dayMs,
  transformToISODate,
  // weekMs,
} from "@/utils/calculateWeek";
import { mapActions } from "vuex";
// import { CHECK_IN_OUT_TIME } from "@/utils/config";
import BookingBar from "./BookingBar.vue";
export default {
  components: { BookingBar },

  name: "RoomTable",

  data() {
    return {
      isPopupOpen: false,
      popupCoords: {
        x: 0,
        y: 0,
        left: true,
        top: true,
      },
      openedBooking: {},
    };
  },

  computed: {
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
      // console.log(arr);
      return arr;
    },

    week() {
      return createWeekDaysList(this.$store.getters.getWeek);
    },

    today() {
      return transformToISODate(new Date());
    },
  },

  mounted() {
    this.fetchRooms();
    this.fetchWeekBookings(this.$store.getters.getWeek);

    window.addEventListener("click", e => {
      if (!e.target.closest(".book")) {
        this.isPopupOpen = false;
      }
    });
  },

  watch: {
    week: "updateBookings",

    isPopupOpen() {
      const closePopup = () => {
        this.isPopupOpen = false;
        window.removeEventListener("scroll", closePopup);
      };

      if (this.isPopupOpen) {
        window.addEventListener("scroll", closePopup);
      }
    },
  },

  methods: {
    closePopup() {
      this.isPopupOpen = false;
    },

    ...mapActions(["fetchRooms", "fetchWeekBookings"]),

    openPopup({ event, booking }) {
      const x = event.clientX;
      const y = event.clientY;

      const left = x <= window.innerWidth / 2;
      const top = y <= window.innerHeight / 2;

      this.popupCoords = { x, y, left, top };

      this.currentBooking = {};

      this.isPopupOpen = false;
      this.currentBooking = booking;

      this.isPopupOpen = true;

      // console.log(this.currentBooking);
    },

    updateBookings() {
      this.$store.dispatch("fetchWeekBookings", this.$store.getters.getWeek);
    },

    countOverlappedBookings(bookings) {
      return bookings.reduce(
        (count, { isOverlapped }) => (count += isOverlapped ? 1 : 0),
        0
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.row {
  display: grid;
  grid-template-columns: 100px 1fr;
  width: 100%;
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

.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* pointer-events: none; */
}

.popup {
  position: fixed;
  width: 200px;
  height: 300px;

  left: 0;
  top: 0;

  background-color: tomato;
}
</style>
