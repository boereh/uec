<script setup lang="ts">
const router = useRouter()

function SignOut() {
  router.push('/login')
}
</script>

<template>
  <p class="dark:text-white/50">All of the dangerous actions you can do to your account. Please be careful with these.</p>

  <br />

  <h4>Sign out</h4>

  <p>Your account will be permanently deleted. This action is irreversible and can not be undone.</p>

  <u-button
    type="primary"
    @click=""
    >Sign out</u-button
  >

  <br />

  <h4>Delete Account</h4>

  <p>Your account will be permanently deleted. This action is irreversible and can not be undone.</p>

  <u-button>Delete</u-button>
</template>
