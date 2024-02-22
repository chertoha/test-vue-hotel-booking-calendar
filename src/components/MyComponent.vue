<template>
  <div class="root">
    <label>
      Input email:
      <input
        type="email"
        v-bind:value="email"
        v-on:input="inputEmail($event.target.value)"
      />
    </label>

    <label>
      Input password:
      <input type="password" :value="password" @input="inputPassword" />
    </label>
  </div>
</template>

<script>
export default {
  name: "MyComponent",
  data() {
    return {
      email: "example@mail.com",
      password: "123456",
    };
  },

  methods: {
    inputEmail(value) {
      this.email = value;
    },

    inputPassword(e) {
      this.password = e.target.value;
    },
  },
};
</script>
