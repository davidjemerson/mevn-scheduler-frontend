<template>
    <div v-if="userCheck">
        <Navigation :user="user" />
        <h2>Win-When (Super Scheduler?)</h2>
        <p>Information about what this is all about coming soon</p>
    </div>
</template>

<script>
import axios from 'axios'
import Navigation from '../components/Navigation'
export default {
    data() {
        return {
            userCheck: false,
            user: null
        }
    },
    beforeCreate: function() {
        axios.get('/auth/user')
            .then(res => {
                if (res.data.user) {
                    this.user = res.data.user
                }
                this.userCheck = true
            })
    },
    components: {
        Navigation
    },
    name: 'AboutPage'
}
</script>