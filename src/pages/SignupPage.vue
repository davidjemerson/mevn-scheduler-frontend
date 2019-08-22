<template>
    <div>
        <Navigation />
        <h3>Signup Page</h3>
        <form>
            <div>
                <label for="firstName">First Name:</label>
                <input id="firstName" type="text" placeholder="Roland" v-model="firstName" required />
            </div>
            <div>
                <label for="lastName">Last Name:</label>
                <input id="lastName" type="text" placeholder="Deschain" v-model="lastName" required />
            </div>
            <div>
                <label for="username">Username:</label>
                <input id="username" type="text" placeholder="WillDearborn" v-model="username" required />
            </div>
            <div>
                <label for="email">Email Address:</label>
                <input id="email" type="email" placeholder="towerjunkie19@lamerkindustries.org" v-model="email" required />
            </div>
            <div>
                <label for="password">Password:</label>
                <input id="password" type="password" v-model="password" required />
            </div>
            <div>
                <button type="submit" @click="handleSubmit">
                    Sign Up!
                </button>
            </div>
        </form>
        <div>
            <h3>{{ currentUser }}</h3>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    export default {
        data() {
            return {
                currentUser: "",
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: ""
            }
        },
        beforeCreate: function() {
            axios.get('/auth/user')
                .then(res => {
                    if (res.data.user) {
                        this.$router.push('/events')
                    }
                })
        },
        methods: {
            updateUser(data) {
                this.currentUser = data
            },
            handleSubmit(e) {
                e.preventDefault()
                axios.post('/auth/signup', {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                    password: this.password
                }).then(res => this.$router.push(res.data))
            }
        },
        components: {
            Navigation
        },
        name: 'SignupPage'
    }
</script>