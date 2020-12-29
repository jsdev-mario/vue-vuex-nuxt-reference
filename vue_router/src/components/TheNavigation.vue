<template>
    <nav id="nav">
        <p class="logo">The Vue School Travel App</p>
        <ul class="nav-links">
            <li class="links">
                <router-link to="/"> Home </router-link>
            </li>
            <li v-for="destination in destinations" :key="destination.name" class="links">
                <router-link :to="{ name: 'DestinationDetails', params: { slug: destination.slug } }">
                    {{ destination.name }}
                </router-link>
            </li>
            <li class="links">
                <router-link to="/user">Dashboard</router-link>
            </li>
        </ul>
    </nav>
</template>

<script>
import data from '@/store/data.js';
export default {
    data() {
        return {
            destinations: data.destinations,
        };
    },
};
</script>

<style scoped>
#nav {
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    background-color: white;
    border-bottom: 1px solid grey;
    z-index: 1;
}

#nav a {
    color: #2c3e50;
    text-decoration: none;
    font-weight: bold;
}

.nav-links {
    display: flex;
}
.links {
    padding-right: 20px;
    list-style: none;
}
.links:hover {
    text-decoration: underline;
}
.logo {
    font-size: 20px;
    color: purple;
    font-weight: bold;
}
</style>
