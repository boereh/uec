<script setup lang="ts">
const tabs = [
  {
    name: 'My UEC',
    key: 'my-uec',
  },
  {
    name: 'Loyalty Rewards',
    key: 'loyalty-rewards',
  },
  {
    name: 'Gift Cards',
    key: 'gift-cards',
  },
  {
    name: 'Order History',
    key: 'order-history',
  },
  {
    name: 'Dangerzone',
    key: 'danger',
  },
]

definePageMeta({
  middleware: ['authenication'],
})
</script>

<template>
  <u-container>
    <u-tabs :tabs="tabs">
      <template #my-uec>
        <pages-account-tab-my-uec />
      </template>

      <template #loyalty-rewards>
        <pages-account-tab-loyalty />
      </template>

      <template #gift-cards>
        <pages-account-tab-gift-cards />
      </template>

      <template #order-history>
        <pages-account-tab-order-history />
      </template>

      <template #danger>
        <pages-account-tab-danger />
      </template>
    </u-tabs>
  </u-container>
</template>
