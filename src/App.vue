<template>
  <div id="app">
    <NavBar />
    <RoomTable />

    <!-- <div
      v-if="isVisible"
      class="popup"
    ></div> -->
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import RoomTable from "./components/RoomTable.vue";

export default {
  name: "App",
  data: () => ({
    // isVisible: false,
  }),
  components: {
    NavBar,
    RoomTable,
  },

  computed: {},

  mounted() {},

  watch: {},

  methods: {
    // openPopup() {
    //   console.log("asdf");
    //   this.isVisible = true;
    // },
  },
};
</script>

<style lang="scss">
/* .popup {
  position: absolute;
  width: 200px;
  height: 300px;

  left: 0;
  top: 0;

  background-color: tomato;
} */
</style>
