<template>
    <div>
        <Navigation :atLogin="true" />
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
            <div v-if="badLogin" class="error-message">
                Invalid login. Please check your email and password and try again.
            </div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    export default {
        data(){
            return {
                currentUser: '',
                email: '',
                password: '',
                badLogin: false
            }
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault()
                axios.post('/auth/login', {
                    username: this.email,
                    password: this.password
                })
                .then(() => {
                    this.$router.push('events')
                }
                )
                .catch(err => {
                    this.badLogin = true
                    return err
                })
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
        name: 'LoginPage',
        components: {
            Navigation
        }
    }
</script>