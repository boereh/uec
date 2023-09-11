<script setup lang="ts">
const route = useRoute()
const router = useRouter()

if (route.params.redirect) {
    router.replace(decodeURIComponent(route.params.redirect as string))
}

router.replace('/account')
</script>

<template>Redirecting...</template>
