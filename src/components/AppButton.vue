<template>
    <a class="app-button" :href=link>{{ buttonText }}</a>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    buttonText: String,
    link: String
  }
}
</script>

<style>
a {
  text-decoration: none;
}
.app-button {
    border: 2px solid blue;
    border-radius: 2rem;
    padding: 1rem;
}
.app-button:hover {
    background-color: lightblue;
    cursor: pointer;
}
</style>