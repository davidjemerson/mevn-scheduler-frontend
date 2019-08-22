<template>
    <div @click="goTo(link)" class="event">
        {{ eventData }}
    </div>
</template>

<script>
export default {
  name: 'EventTile',
  props: {
    eventData: String,
    link: String
  },
  methods: {
      goTo: function(link) {
          this.$router.push(link)
      }
  }
}
</script>

<style>

.event {
    display: inline-block;
    margin: 10px;
    border: 2px solid blue;
    width: 300px;
    height: 400px;
    border-radius: 2rem;
    padding: 1rem;
}
.event:hover {
    background-color: lightblue;
    cursor: pointer
}
</style>