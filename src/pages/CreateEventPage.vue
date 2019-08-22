<template>
    <div>
        <Navigation v-if="userCheck" :user="user" />
        <h3>Create new events here</h3>
        <form>
            <div class="form-element">
                <label for="eventName">Event Name:</label>
                <input id="eventName" type="text" v-model="eventName" required />
            </div>
            <div class="form-element">
                <label for="eventLocation">Event Location:</label>
                <input id="eventLocation" type="text" v-model="eventLocation" required />
            </div>
            <div v-for="n in dateCount" v-bind:key="'date-'+n" class="form-element">
                <label for="date">Potential Date #{{ n }}:</label>
                <input id="date" type="date" v-model="dateList[n - 1]" required />
            </div>
            <div @click="addDate" class="button">+ Date</div>
            <div @click="removeDate" class="button">- Date</div>
            <div v-for="n in inviteCount" v-bind:key="'invitee-'+n" class="form-element">
                <label for="invitee">Invitee #{{ n }} Email:</label>
                <input id="invitee" type="email" v-model="inviteeList[n - 1]" required />
            </div>
            <div @click="addInvitee" class="button">+ Invitee</div>
            <div @click="removeInvitee" class="button">- Invitee</div>
            <div class="form-element">
                <label for="winThreshold">Number of Attendees Required:</label>
                <input id="winThreshold" type="number" v-model="winThreshold" required />
            </div>
            <div class="form-element">
                <label for="pollClose">Responses Required By:</label>
                <input id="pollClose" type="date" v-model="pollClose" required />
            </div>
            <div class="form-submit" @click="handleSubmit">Create Event</div>
        </form>
    </div>
</template>

<script>
    import axios from 'axios'
    import Navigation from '../components/Navigation'
    export default {
        name: 'CreateEventPage',
        data() {
            return {
                user: null,
                userCheck: false,
                dateCount: 2,
                inviteCount: 2,
                eventName: '',
                eventLocation: '',
                dateList: [],
                inviteeList: [],
                winThreshold: '',
                pollClose: ''
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
                })
        },
        methods: {
            addDate: function(e) {
                e.preventDefault()
                this.dateCount++
            },
            removeDate: function(e) {
                e.preventDefault()
                if (this.dateCount > 1) {
                    this.dateList.splice(this.dateCount - 1, 1)
                    this.dateCount--
                }
            },
            addInvitee: function(e) {
                e.preventDefault()
                this.inviteCount++
            },
            removeInvitee: function(e) {
                e.preventDefault()
                if (this.inviteCount > 1) {
                    this.inviteeList.splice(this.inviteCount - 1, 1)
                    this.inviteCount--
                }
                
            },
            handleSubmit: function(e) {
                e.preventDefault()
                let finalDates = []
                let finalInvites = []
                this.dateList.forEach(date => {
                    if (date !== undefined) {
                        finalDates.push(date)
                    }
                })
                this.inviteeList.forEach(invitee => {
                    if (invitee !== undefined) {
                        finalInvites.push({email: invitee})
                    }
                })
                const eventObject = {
                    eventName: this.eventName,
                    organizer: this.user._id,
                    eventLocation: this.eventLocation,
                    datePool: finalDates,
                    invites: finalInvites,
                    winThreshold: parseInt(this.winThreshold),
                    pollClose: this.pollClose
                }
            axios.post('/api/events', eventObject).then(res => {
                    this.$router.push({name: 'eventDetail', params: { id: res.data._id } })
                })
            }
        },
        components: {
            Navigation
        }
    }
</script>

<style scoped>
    .button {
        display: inline-block;
        margin: 0 5px;
        padding: 2px;
        border: 1px solid black;
    }
    .button:hover {
        cursor: pointer;
    }

    .form-submit {
        margin: 5px auto;
        padding: 5px;
        width: 125px;
        border: 1px solid black;
        border-radius: 5px;
    }

    .form-submit:hover {
        cursor: pointer;
        background-color: lightgreen;
    }
</style>