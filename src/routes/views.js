import WelcomePage from '../pages/WelcomePage.vue'
import SignupPage from '../pages/SignupPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import EventsPage from '../pages/EventsPage.vue'
import EventDetailsPage from '../pages/EventDetailsPage.vue'
import CreateEventPage from '../pages/CreateEventPage.vue'
import RespondPage from '../pages/RespondPage.vue'

const routes = [
    { path: '/', component: WelcomePage },
    { path: '/signup', component: SignupPage },
    { path: '/login', component: LoginPage },
    { path: '/events', component: EventsPage },
    { path: '/events/:id', component: EventDetailsPage },
    { path: '/newevent', component: CreateEventPage },
    { path: '/respond/:event/:invite', component: RespondPage }
]

export default routes