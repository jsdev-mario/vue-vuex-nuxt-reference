<template>
    <div class="login">
        <h1>Login</h1>
        <div class="form">
            <label for="username">Username</label>
            <input v-model="username" type="text" name="username" class="input" />
            <label for="password">Password</label>
            <input v-model="password" type="password" class="input" />
            <button @click="login" class="btn">Login</button>
        </div>
    </div>
</template>
<script>
import data from '@/store/data';
export default {
    data() {
        return {
            username: null,
            password: null,
        };
    },
    methods: {
        login() {
            data.user = this.username;
            const redirectPath = this.$route.query.redirect || '/';
            this.$router.push(redirectPath);
        },
    },
};
</script>
<style lang="scss" scoped>
.form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;
    input {
        margin-bottom: 20px;
    }
}
</style>
