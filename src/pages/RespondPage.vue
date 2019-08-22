<template>
    <div>
        <Navigation v-if="userCheck" :user="user" />
        <h3 v-if="eventCheck">This is {{ invitee.email }}'s response page for {{ event.eventName }}.</h3>
        <div v-if="!responsePosted">
            <div v-for="date in event.datePool" :key="date" @click="toggleDate(date)" class="date" :class="{ selected: dateList.indexOf(date) !== -1 }">{{ date }}</div>
            <div class="button" @click="handleResponse">Confirm Availability</div>
        </div>
        <div v-if="responsePosted">
            <h4>Thanks for confirming your availability! We'll send you a notification on {{ event.pollClose }} to let you know if and when this event is scheduled.</h4>
            <h4>If you ever need to update your availability, just follow the link in your original invite email.</h4>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    export default {
        name: 'RespondPage',
        components: {
            Navigation
        },
        data() {
            return {
                user: null,
                userCheck: false,
                event: {},
                invitee: {},
                eventCheck: false,
                dateList: [],
                responsePosted: false
            }
        },
        beforeCreate: function() {
            axios.get('/auth/user')
                .then(res => {
                    if (res.data.user) {
                        this.user = res.data.user
                    }
                    this.userCheck = true
                    axios.get(`/api/events/${this.$route.params.event}`)
                        .then(res => {
                            this.event = res.data
                            for (let i = 0 ; i < this.event.invites.length ; i++) {
                                if (this.event.invites[i]._id === this.$route.params.invite) {
                                    this.invitee = this.event.invites[i]
                                    break
                                }
                            }
                            this.eventCheck = true
                        })
                })
        },
        methods: {
            toggleDate: function(date) {
                const dateIndex = this.dateList.indexOf(date)
                if (dateIndex === -1) {
                    this.dateList.push(date)
                } else {
                    this.dateList.splice(dateIndex, 1)
                }
            },
            handleResponse: function() {
                axios.put(`/api/events/response/${this.event._id}/${this.invitee._id}`, this.dateList)
                    .then(res => {
                        if (res.status === 200) {
                            this.responsePosted = true
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .button {
        margin: 5px auto;
        width: 250px;
        padding: 5px;
        border: 1px solid black;
    }

    .button:hover {
        cursor: pointer;
        background-color: lightgreen;
    }

    .date {
        display: inline-block;
        margin: 10px;
        width: 150px;
        height: 150px;
        border: 1px solid black;
    }

    .date.selected {
        background-color: lightblue;
    }

    .date:hover {
        cursor: pointer;
        background-color: lightgreen;
    }
</style>