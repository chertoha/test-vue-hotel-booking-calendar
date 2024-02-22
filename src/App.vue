<template>
  <div id="app">
    <my-component />

    <br />
    <br />
    <br />

    <my-counter />

    <br />
    <br />
    <br />
    <my-search-list />
  </div>
</template>

<script>
import MyComponent from "./components/MyComponent";
import MyCounter from "./components/MyCounter";
import MySearchList from "./components/MySearchList";

export default {
  name: "App",
  components: { MyComponent, MyCounter, MySearchList },
};
</script>

<style></style>
