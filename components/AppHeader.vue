<script setup lang="ts">
const route = useRoute();
const active = ref(route.path);

const routerList = reactive([
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Test', path: '/test' },
    { name: 'Test2', path: '/test2' },
]);

const clickActive = (path: string) => {
    active.value = path;
};
</script>

<template>
    <header class="header">
        <nav class="header__nav">
            <div class="header__nav-item" :class="{ 'header__nav-item_active': active === item.path }" v-for="(item, index) in routerList" :key="index" @click="clickActive(item.path)">
                <NuxtLink :to="item.path">{{ item.name }}</NuxtLink>
            </div>
        </nav>
    </header>
</template>

<style lang="scss" scoped>
.header {
    position: sticky;
    top: 0;
    height: 60px;
    background-color: rgba(51, 51, 51,.9);
    color: #fff;
    display: flex;
    align-items: center;
    padding: 0 20px;
    z-index: 9;
    &__nav {
        display: flex;
        align-items: center;
        &-item {
            margin-right: 20px;
            a {
                color: #ccc;
                &:hover {
                    color: #fff;
                }
            }
            &_active {
                a {
                    color: #fff;
                }
            }
        }
    }
}
</style>
