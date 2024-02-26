<template>
  <button
    class="button"
    type="button"
    @click="clickHandler"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "CommonButton",

  props: {
    label: { type: String, required: false, default: "Button" },
    clickHandler: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin: 0;
  border: none;
  padding: 10px 30px;
  cursor: pointer;
  color: rgb(238, 234, 234);
  font-size: 20px;

  border-radius: 10px;
  background-color: rgb(46, 38, 75);

  transition: background-color 300ms ease-in-out;
  &:hover {
    background-color: rgb(120, 111, 111);
  }
}
</style>
