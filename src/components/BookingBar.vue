<template>
  <!-- <div> -->
  <div
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

    <!-- <div class="popup"></div> -->
  </div>

  <!-- </div> -->
</template>

<script>
import { dayMs, weekMs } from "@/utils/calculateWeek";
import { CHECK_IN_OUT_TIME } from "@/utils/config";

export default {
  name: "BookingBar",

  props: {
    booking: {
      type: Object,
      required: true,
    },
    index: { type: Number, required: true },
  },

  computed: {
    checkInOutTime() {
      return CHECK_IN_OUT_TIME / 24;
    },
  },

  methods: {
    getDuration(start, end) {
      const startDateMs = new Date(start).getTime();
      const endDateMs = new Date(end).getTime();
      return (endDateMs - startDateMs) / dayMs;
    },

    getOffset(start) {
      const startDateMs = new Date(start).getTime();
      const offset = (startDateMs - this.$store.getters.getWeek) / dayMs;
      return offset;
    },

    getEndOffset(end) {
      const endDateMs = new Date(end).getTime();
      const offset = (this.$store.getters.getWeek + weekMs - endDateMs) / dayMs;
      return offset;
    },
  },
};
</script>

<style lang="scss" scoped>
.book {
  box-sizing: border-box;
  position: absolute;

  left: 0;
  bottom: 0;
  width: 300px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 20px;

  border-radius: 15px;
  border-right: 3px solid white;
  background-color: rgb(41, 131, 249);

  &.right {
    justify-content: flex-end;
  }

  &.left {
    justify-content: flex-start;
  }
}

.popup {
  position: absolute;
  width: 200px;
  height: 300px;

  left: 0;
  top: 0;

  background-color: tomato;
}
</style>
