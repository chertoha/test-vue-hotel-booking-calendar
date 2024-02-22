<template>
  <div>
    <h4>My Search List</h4>
    <input type="text" :value="search" @input="onSearchInput($event.target.value)" />

    <p>all names {{ list.length }}, found names {{ filteredList.length }}</p>

    <ul>
      <li v-for="item in filteredList" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "MySearchList",
  data() {
    return {
      search: "",
      list: [
        { id: 1, name: "Anatol" },
        { id: 2, name: "Anton" },
        { id: 3, name: "Serg" },
        { id: 4, name: "Dmytro" },
        { id: 5, name: "Kyril" },
        { id: 6, name: "Konstant" },
      ],
    };
  },
  methods: {
    onSearchInput(value) {
      console.log(value);
      this.search = value;
    },
  },

  computed: {
    filteredList() {
      return this.list.filter(({ name }) =>
        name.toLowerCase().includes(this.search.toLowerCase())
      );
    },
  },
};
</script>
