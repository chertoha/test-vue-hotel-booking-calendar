<template>
  <div class="grid-component">
    <div class="head-row">
      <div class="col first-cell"></div>
      <div class="grid">
        <div
          :class="['cell', 'head-cell', { today: day === today }]"
          v-for="day in week"
          :key="day"
        >
          <span class="date">{{ day }}</span>
        </div>
      </div>
    </div>

    <div
      v-for="{ room, bookings } in roomWithBookings"
      class="row"
      :style="{ height: `calc(100px * ${countOverlappedBookings(bookings)})` }"
      :key="room"
    >
      <div class="col room-name">{{ room }}</div>
      <div class="grid">
        <div
          :class="['cell', { today: day === today }]"
          class="cell"
          v-for="day in week"
          :key="day"
        ></div>

        <BookingBar
          @emitPopup="openPopup"
          v-for="(booking, index) in bookings"
          :key="booking.name"
          :booking="booking"
          :index="index"
        />
      </div>
    </div>

    <PopUp
      :openedBooking="openedBooking"
      :isPopupOpen="isPopupOpen"
      :popupCoords="popupCoords"
      :onClose="closePopup"
    />
  </div>
</template>

<script>
import { createWeekDaysList, transformToISODate } from "@/utils/calculateWeek";
import { mapActions } from "vuex";
import BookingBar from "./BookingBar.vue";
import PopUp from "./PopUp.vue";
import { calcPopupPosition } from "@/utils/calcPopupPosition";

export default {
  components: { BookingBar, PopUp },

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
    //Refactor needed !!!
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
      if (!e.target.closest(".book, .popup")) {
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
        window.removeEventListener("resize", closePopup);
      };

      if (this.isPopupOpen) {
        window.addEventListener("scroll", closePopup);
        window.addEventListener("resize", closePopup);
      }
    },
  },

  methods: {
    closePopup() {
      this.isPopupOpen = false;
    },

    ...mapActions(["fetchRooms", "fetchWeekBookings"]),

    openPopup({ event, booking }) {
      this.popupCoords = { ...calcPopupPosition(event.clientX, event.clientY) };
      this.openedBooking = {};

      this.isPopupOpen = false;
      this.openedBooking = booking;

      this.isPopupOpen = true;
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
.row,
.head-row {
  display: grid;
  grid-template-columns: 200px 1fr;
  width: 100%;
  min-height: 100px;

  @media screen and (max-width: 767.98px) {
    grid-template-columns: 1fr;
  }
}

.head-row {
  min-height: auto;
}

.grid {
  overflow: hidden;
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.col {
  border: 1px solid rgb(225, 225, 225);
  padding: 20px;
  display: flex;
  align-items: center;
  color: rgb(56, 98, 54);
  font-weight: 700;

  @media screen and (max-width: 767.98px) {
    display: none;
  }
}

.first-cell {
  border-top: none;
  border-left: none;
}

.cell {
  border: 1px solid rgb(225, 225, 225);

  &.today {
    background-color: rgb(204, 239, 204);
  }

  &.head-cell {
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 14px;

    padding-top: 20px;
    padding-bottom: 20px;

    @media screen and (min-width: 768px) {
      font-size: 16px;
    }

    @media screen and (min-width: 1200px) {
      font-size: 20px;
    }
  }

  .date {
    @media screen and (max-width: 767.98px) {
      transform: rotate(-180deg);
      writing-mode: vertical-lr;
      text-orientation: sideways;
    }
  }
}
</style>
