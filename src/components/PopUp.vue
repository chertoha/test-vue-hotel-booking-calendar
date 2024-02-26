<template>
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
    <div class="data-wrapper">
      <div class="contacts">
        <p class="title">{{ openedBooking.name }}</p>
        <p class="contact">{{ openedBooking.phone }}</p>
        <p class="contact">{{ openedBooking.email }}</p>
      </div>

      <div class="guest-data">
        <p class="apparment-type">{{ openedBooking.typeOfApartments }}</p>
        <p class="guests-title">Number of Guests</p>
        <p class="guest-data__item">
          Adults: {{ openedBooking.guestInfo.adults }}
        </p>
        <p class="guest-data__item">
          Children: {{ openedBooking.guestInfo.children }}
        </p>
      </div>
    </div>

    <div class="toolbar">
      <CommonButton
        :clickHandler="onClose"
        :label="'Close'"
      />
    </div>
  </div>
</template>

<script>
import CommonButton from "@/components/UIKit/CommonButton";

export default {
  name: "PopUp",

  components: { CommonButton },

  props: {
    isPopupOpen: {
      type: Boolean,
      required: true,
    },

    popupCoords: {
      type: Object,
      required: true,
    },

    openedBooking: {
      type: Object,
      required: true,
    },

    onClose: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.popup {
  min-width: 300px;
  position: fixed;
  font-size: 16px;

  left: 0;
  top: 0;

  border-radius: 10px;
  background-color: white;
  box-shadow:
    0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14),
    0px 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.data-wrapper {
  padding: 20px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 700;
}
.contact {
  & + & {
    margin-top: 8px;
  }
}
.guest-data {
  margin-top: 30px;
}
.apparment-type {
  margin-bottom: 15px;
}
.guests-title {
  margin-bottom: 7px;
  font-weight: 700;
}
.guest-data__item {
  & + & {
    margin-top: 5px;
  }
}
.toolbar {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
}
</style>
