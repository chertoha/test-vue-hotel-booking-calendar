<template>
  <div id="app">
    <NavBar />
    <RoomTable />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import RoomTable from "./components/RoomTable.vue";

export default {
  name: "App",
  data: () => ({}),
  components: {
    NavBar,
    RoomTable,
  },

  computed: {},

  mounted() {},

  watch: {},

  methods: {},
};
</script>

<style lang="scss"></style>
