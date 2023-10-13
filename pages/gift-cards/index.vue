<script setup lang="ts">
useHead({
  title: 'Gift Cards - UEC Theatres',
})
</script>

<template>
  <u-container>
    <h1>Gift Cards</h1>

    <p>
      Give the gift of entertainment. Purchase a UEC Gift Card online today!. You have the option of purchasing a physical UEC gift card or a digital eCard.
      They are redeemable at any time, at any participating UEC Theatre, and never expire. Gift Cards are good for both movie tickets and/or concession
      purchases. Other Terms and Conditions apply.
    </p>

    <br />

    <div class="bg-brand-red-grad grid md:grid-cols-2 gap-4 sm:gap-8 rounded-md">
      <div class="p-8 pb-0 flex justify-center items-center">
        <img
          class=""
          src="/img/gift-card-main.png"
          alt="gift cards hero"
        />
      </div>

      <div class="p-8 flex flex-col justify-center <sm:items-center <sm:text-center text-white">
        <h2>Looking For The Perfect Gift For Any Occasion?</h2>

        <p class="pb-4">Give The Gift Of Entertainment</p>

        <u-button
          type="secondary"
          size="large"
          href="/gift-cards/buy"
        >
          Order Gift Card
        </u-button>
      </div>
    </div>

    <br />
    <br />

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
      <u-sheet
        no-padding
        class="border dark:border-dark-300 rounded-md"
      >
        <div class="bg-brand-red-grad rounded-t-md h-60 py-4 grid place-items-center">
          <img
            src="/img/gift-card-login.png"
            alt="gift card mouse"
          />
        </div>

        <div class="px-4 pb-4">
          <h4>Register Your Card</h4>

          <p>Create your own profile and access special features</p>

          <br />

          <u-button href="/account#gift-cards">Login</u-button>
        </div>
      </u-sheet>

      <u-sheet
        no-padding
        class="border dark:border-dark-300 rounded-md"
      >
        <div class="bg-brand-red-grad rounded-t-md grid place-items-center p-4 h-60">
          <img
            src="/img/gift-card-concessions.png"
            alt="gift card mouse"
          />
        </div>

        <div class="px-4 pb-4">
          <h4>Find Out Your Balance</h4>

          <p>Login to see how much you have left on your card</p>

          <br />

          <u-button href="/account#gift-cards"> Check Balance </u-button>
        </div>
      </u-sheet>

      <u-sheet
        no-padding
        class="border dark:border-dark-300 rounded-md"
      >
        <div class="bg-brand-red-grad rounded-t-md grid place-items-center p-4 h-60">
          <img
            src="/img/gift-card-laptop.png"
            alt="gift card mouse"
          />
        </div>

        <div class="px-4 pb-4">
          <h4>Card Running Low?</h4>

          <p>If you already have a gift card, you can recharge it online</p>

          <br />

          <u-button href="/account#gift-cards"> Recharge Card </u-button>
        </div>
      </u-sheet>
    </div>
  </u-container>
</template>
