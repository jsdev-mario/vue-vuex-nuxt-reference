<template>
    <div>
        <h1>Welcome {{ user }}</h1>
        <p>
            <router-link
                :to="{
                    name: 'invoices',
                }"
                >Invoices</router-link
            >
        </p>
        <button @click="logout" class="btn">Log out</button>
    </div>
</template>

<script>
import data from '@/store/data';
export default {
    data() {
        return { user: data.user };
    },
    methods: {
        logout() {
            data.user = null;
            this.$router.push('/');
        },
    },
};
</script>
