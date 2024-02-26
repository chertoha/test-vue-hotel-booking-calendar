<template>
  <div
    id="app"
    class="main-wrapper"
  >
    <div class="navbar-wrapper">
      <NavBar />
    </div>

    <RoomTable />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import RoomTable from "./components/RoomTable.vue";

export default {
  name: "App",

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

<style lang="scss" scoped>
.main-wrapper {
  padding: 40px 16px;

  @media screen and (min-width: 768px) {
    padding: 80px 32px;
  }

  @media screen and (min-width: 1200px) {
    padding: 120px 64px;
  }
}

.navbar-wrapper {
  margin-bottom: 20px;
}
</style>
