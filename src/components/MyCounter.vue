<template>
  <div class="my-counter">
    <h4>My Counter</h4>
    <button type="button" @click="decrease">-</button>

    <input type="number" :value="value" />

    <button type="button" @click="increase">+</button>
  </div>
</template>

<script>
export default {
  name: "MyCounter",
  data() {
    return {
      value: 0,
      minValue: 0,
      maxValue: 10,
    };
  },

  methods: {
    increase() {
      if (this.value < this.maxValue) this.value += 1;
    },

    decrease() {
      if (this.value > this.minValue) this.value -= 1;
    },
  },
};
</script>
