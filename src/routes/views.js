import WelcomePage from '../pages/WelcomePage.vue'
import AboutPage from '../pages/AboutPage.vue'
import SignupPage from '../pages/SignupPage.vue'
import LoginPage from '../pages/LoginPage.vue'
import EventsPage from '../pages/EventsPage.vue'
import EventDetailsPage from '../pages/EventDetailsPage.vue'
import CreateEventPage from '../pages/CreateEventPage.vue'
import RespondPage from '../pages/RespondPage.vue'

const routes = [
    { path: '/', name: 'home', component: WelcomePage },
    { path: '/about', name: 'about', component: AboutPage },
    { path: '/signup', name: 'signup', component: SignupPage },
    { path: '/login', name: 'login', component: LoginPage },
    { path: '/events', name: 'events', component: EventsPage },
    { path: '/events/:id', name: 'eventDetail', component: EventDetailsPage },
    { path: '/newevent', name: 'newEvent', component: CreateEventPage },
    { path: '/respond/:event/:invite', name: 'response', component: RespondPage }
]

export default routes