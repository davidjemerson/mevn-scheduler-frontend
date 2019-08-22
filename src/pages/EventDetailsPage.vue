<template>
    <div>
        <Navigation v-if="userCheck" :user="user" />
        <div v-if="eventFetched">
            <h3>Details for {{ event.eventName }}</h3>
            <h4>Organizer: {{ event.organizer.name.firstName + ' ' + event.organizer.name.lastName }}</h4>
            <h4>Location: {{ event.eventLocation }}</h4>
            <h4>Possible Dates:</h4>
            <h4 v-for="date in event.datePool" :key="date">{{ date }}</h4>
        </div>
        
    </div>
</template>

<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    export default {
        name: 'EventDetailsPage',
        data() {
            return {
                user: null,
                userCheck: false,
                eventFetched: false,
                event: {}
            }
        },
        beforeCreate: function() {
            axios.get('/auth/user')
                .then(res => {
                    if (!res.data.user) {
                        this.$router.push({name: 'home'})
                    } else {
                        this.user = res.data.user
                    }
                    this.userCheck = true
                    axios.get(`/api/events/${ this.$route.params.id }`)
                        .then(res => {
                            this.event = res.data
                            this.eventFetched = true
                        })
                })
        },
        components: {
            Navigation
        }
    }
</script>