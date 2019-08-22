<template>
    <div class="main-nav">
        <div class="nav-brand" @click="gotoHome">Win-When</div>
        <div v-if="navUser" class="nav-links">
            <ul>
                <li @click="gotoEvents">My Events</li>
                <li @click="gotoNewEvent">Create New Event</li>
            </ul>
        </div>
        <div v-else class="nav-links"></div>
        <div v-if="navUser" class="nav-tools">
            <div class="nav-userdata">{{ userDisplay }}</div>
            <div class="nav-log" @click="handleLogout">Log Out</div>
        </div>
        <div v-else-if="atLogin" class="nav-tools"></div>
        <div v-else class="nav-tools">
            <div class="nav-log" @click="handleLogin">Log In</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "Navigation",
    data() {
        return {
            userDisplay: '',
            navUser: null
        }
    },
    props: {
        user: Object,
        atLogin: Boolean
    },
    beforeMount: function() {
        if (this.user) {
            this.navUser = this.user.name.firstName
            this.userDisplay = `Welcome ${this.navUser}`
        }
    },
    methods: {
        handleLogout(e) {
            e.preventDefault()
            axios.post('/auth/logout')
                .then(() => {
                    this.navUser = null
                    this.$router.push({name: 'home'})
                })
        },
        handleLogin(e) {
            e.preventDefault()
            this.$router.push({name: 'login'})
        },
        gotoEvents(e) {
            e.preventDefault()
            this.$router.push({name: 'events'})
        },
        gotoNewEvent(e) {
            e.preventDefault()
            this.$router.push({name: 'newEvent'})
        },
        gotoHome(e) {
            e.preventDefault()
            this.$router.push({name: 'home'})
        }
    }
}
</script>

<style scoped>
ul {
    list-style: none;
}

li {
    display: inline-block;
    margin: 0 10px; 
}

.main-nav {
    width: 100%;
    margin: 0;
    padding: 20px 0;
    background-color: lightgreen;
}

.nav-brand {
    display: inline-block;
    width: 20%;
}

.nav-brand:hover {
    cursor: pointer;
}

.nav-links {
    display: inline-block;
    width: 60%;
}

.nav-tools {
    display: inline-block;
    width: 20%;
}

.nav-log {
    padding: 5px;
    border: 1px solid black;
    display: inline-block;
}

.nav-log:hover {
    cursor: pointer;
}

.nav-userdata {
    display: inline-block;
    margin-right: 10px;
}

.nav-links li {
    cursor: pointer;
}
</style>