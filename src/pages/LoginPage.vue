<template>
    <div>
        <h3>Login Page</h3>
        <form>
            <div>
                <label for="email">Email Address:</label>
                <input id="email" type="email" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" required />
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Login
                </button>
            </div>
            <div>
                <button @click="logOut">
                    Log Out
                </button>
            </div>
        </form>
        <h3>{{ currentUser }}</h3>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        data(){
            return {
                currentUser: "",
                email: "",
                password: ""
            }
        },
        beforeMount: function() {
            axios.get('/auth/user')
                .then(res => {
                    if (!res.data.user) {
                        this.currentUser = 'The current user is: Nobody'
                    } else {
                        this.currentUser = 'The current user is: ' + res.data.user.name.firstName + ' ' + res.data.user.name.lastName
                    }
                })
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                axios.post('/auth/login', {
                    username: this.email,
                    password: this.password
                })
                .then(response => {
                    this.currentUser = 'The current user is: ' + response.data.name.firstName + ' ' + response.data.name.lastName
                })
                .catch(err => err)
            },
            updateUser(data) {
                this.currentUser = data
            },
            logOut(e) {
                e.preventDefault()
                axios.post('/auth/logout')
                .then(() => {
                    this.currentUser = "Nobody"
                })
                .catch(err => err)
            }
        },
        name: 'LoginPage'
    }
</script>