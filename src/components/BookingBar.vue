<template>
  <div
    @click="emitPopup"
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
    <div class="content">
      <span>
        {{ booking.name }}
      </span>

      <span class="content-room">
        {{ booking.roomDetails.name }}
      </span>
    </div>
  </div>
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

    emitPopup(event) {
      this.$emit("emitPopup", { event, booking: this.booking });
    },
  },
};
</script>

<style lang="scss" scoped>
.book {
  cursor: pointer;
  box-sizing: border-box;
  position: absolute;

  left: 0;
  bottom: 0;
  width: 300px;
  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 12px;

  border-radius: 15px;
  border-right: 3px solid white;
  background-color: rgb(41, 131, 249);

  &.right {
    justify-content: flex-end;
  }

  &.left {
    justify-content: flex-start;
  }

  @media screen and (min-width: 768px) {
    font-size: 12px;
  }

  @media screen and (min-width: 1200px) {
    font-size: 20px;
  }
}

.content {
  display: flex;
  flex-direction: column-reverse;
  row-gap: 10px;
}

.content-room {
  font-weight: 700;
  @media screen and (min-width: 768px) {
    display: none;
  }
}
</style>
