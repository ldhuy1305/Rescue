<template>
    <!-- <component :is="layout" /> -->
    <router-view />
</template>

<script>
// import MainLayout from '@/shared/main-layout';
// import { mapActions, mapMutations, mapState } from 'vuex';

export default {
    name: 'App',
    // components: { MainLayout },
    data() {
        return {
            layout: null
        };
    },
    created() {},
    mounted() {
        this.checkReload();
    },
    computed: {},
    watch: {
        $route(to) {
            if (to.meta.layout !== undefined) {
                this.layout = to.meta.layout;
            } else {
                this.layout = 'MainLayout';
            }
        }
    },
    methods: {
        checkReload() {}
    }
};
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';
@import 'bootstrap';
</style>
