<template>
  <div v-if="userCheck">
    <Navigation :user="user" />
    <h1>Welcome to Win-When</h1>
    <h3>Hi there</h3>
    <ul>
      <li>
        <AppButton buttonText="Learn More" link="/about" />
      </li>
      <li>
        <AppButton v-if="user" buttonText="View Events" link="/events" />
        <AppButton v-else buttonText="Sign Up" link="/signup" />
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import AppButton from '../components/AppButton.vue'
import Navigation from '../components/Navigation.vue'

export default {
  name: 'WelcomePage',
  data() {
    return {
      user: null,
      userCheck: false
    }
  },
  beforeCreate: function() {
    axios.get('/auth/user')
      .then(res => {
        if (!res.data.user) {
            this.user = null
        } else {
            this.user = res.data.user
        }
        this.userCheck = true
      })
  },
  components: {
    AppButton,
    Navigation
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