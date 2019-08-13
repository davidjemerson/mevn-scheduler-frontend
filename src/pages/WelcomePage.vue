<template>
  <div class="WelcomePage">
    <h1>Welcome to Win-When</h1>
    <h3>Hi there</h3>
    <ul>
      <li>
        <AppButton buttonText="Learn More"/>
      </li>
      <li>
        <AppButton buttonText="Get Started" link="./signup"/>
      </li>
    </ul>
  </div>
</template>

<script>
import AppButton from '../components/AppButton.vue'

export default {
  name: 'WelcomePage',
  components: {
    AppButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>