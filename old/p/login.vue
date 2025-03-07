<script setup lang="ts">
import { whenever } from '@vueuse/core'

type Provider = 'google' | 'facebook' | 'twitch' | 'twitter' | 'discord' | 'github'

const route = useRoute()
const router = useRouter()

// function Login(provider: Provider) {
//   useSupabaseClient().auth.signInWithOAuth({
//     provider,
//     options: {
//       queryParams: {
//         redirect: (route.query.redirect as string) || '/account',
//       },
//       redirectTo: `${location.origin}/confirm`,
//     },
//   })
// }

// whenever(useSupabaseUser(), () => router.replace('/account'), {
//   immediate: true,
// })

definePageMeta({
  middleware: ['authenication'],
})
</script>

<template>
  <u-container
    fill
    class="grid place-items-center"
  >
    <u-sheet class="sm:p-8 min-w-xs">
      <h2>Welcome back!</h2>

      <p class="text-black/70 dark:text-white/70">Please login back in to continue.</p>

      <br />

      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4 dark:text-white text-1xl">
        <u-button
          icon="logos:google-icon"
          block
          @click="Login('google')"
        >
          Google
        </u-button>

        <u-button
          icon="logos:facebook"
          block
          @click="Login('facebook')"
        >
          Facebook
        </u-button>

        <u-button
          icon="logos:discord-icon"
          block
          @click="Login('discord')"
        >
          Discord
        </u-button>

        <u-button
          icon="logos:twitter"
          block
          @click="Login('twitter')"
        >
          Twitter
        </u-button>

        <u-button
          icon="logos:twitch"
          block
          @click="Login('twitch')"
        >
          Twitch
        </u-button>

        <u-button
          icon="bi:github"
          block
          @click="Login('github')"
        >
          Github
        </u-button>
      </div>
    </u-sheet>
  </u-container>
</template>
