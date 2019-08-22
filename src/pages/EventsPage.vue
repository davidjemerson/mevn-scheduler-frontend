<template>
    <div>
        <Navigation v-if="userCheck" :user="user" />
        <h3>Events Page</h3>
        <div v-if="eventCheck">
            <EventTile eventData="+ New Event" link="/newevent"/>
            <EventTile v-for="event in events" :key="event._id" :eventData="event._id" :link="`/events/${event._id}`" />
        </div>
        
    </div>
</template>

<script>
    import EventTile from '../components/EventTile'
    import Navigation from '../components/Navigation'
    import axios from 'axios'
    export default {
        data() {
            return {
                user: null,
                userCheck: false,
                eventCheck: false,
                events: []
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
                    axios.get(`/api/events/organizer/${this.user._id}`)
                        .then(res => {
                            this.events = res.data
                            this.eventCheck = true
                        })
                })
        },
        name: 'EventsPage',
        components: {
            EventTile,
            Navigation
        }
    }
</script>