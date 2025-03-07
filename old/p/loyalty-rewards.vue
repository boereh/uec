<script setup lang="ts">
useHead({
  title: 'Loyalty Rewards - UEC Theatres',
})
</script>

<template>
  <u-container>
    <h1>Loyalty Rewards</h1>

    <p>By joining the FREE Loyalty Rewards Program you can earn FREE Popcorn, FREE drinks and FREE movie tickets! Start earning points today.</p>

    <br />

    <div class="flex <sm:flex-col gap-4 sm:gap-8">
      <div class="bg-brand-red-grad px-8 pt-2 min-w-56 rounded-md">
        <img
          src="/img/loyalty-rewards-main.png"
          alt="loyalty rewards cards"
        />
      </div>

      <div class="flex-grow">
        <h3>Earn Points Towards Rewards</h3>

        <p>
          By joining the FREE Loyalty Rewards Program you can earn FREE Popcorn, FREE drinks and FREE movie tickets! You may register for Loyalty Rewards by
          visiting the box office or concession stand at a participating theatre. Once you have completed the registration process, you will receive the card.
        </p>
      </div>
    </div>

    <br />

    <div class="flex <sm:flex-col-reverse gap-4 sm:gap-8">
      <div class="flex-grow">
        <h3>Earn More When You Vist More</h3>

        <p>
          Earning points is easy. You will earn rewards at participating theatres as follows: 8 points for each regular price Adult Ticket; 6 points for each
          Child, Senior or Matinee Ticket; 1 additional point for each 3D Ticket; 1 additional point for each VIP Ticket; 1 point for every $1 you spend on all
          concession purchases, Points are rounded down to the nearest whole dollar. Example: $3.75 rounds off to $3.00 (3 Points); Rewards earned are printed
          on the receipt each time you reach a qualifying point threshold. Rewards include free popcorn, soft drinks, and movie tickets. Concession reward
          redemptions expire after 100 days.
        </p>
      </div>

      <div class="bg-brand-red-grad p-4 min-w-56 rounded-md">
        <img
          src="/img/loyalty-rewards-tickets.png"
          alt="loyalty rewards cards"
        />
      </div>
    </div>

    <br />

    <div class="flex justify-center items-center">
      <u-button
        type="primary"
        size="large"
        href="/account#loyalty-rewards"
      >
        Start Eaning Points Now!
      </u-button>
    </div>

    <br />

    <h1>FAQs</h1>

    <u-accordion header="What if I forget to bring my Loyalty Rewards card to the theatre?">
      If you forget to bring your Loyalty Rewards card to the theatre, simply provide your Loyalty Rewards number when making your purchase. Give your number to
      theatre staff at the beginning of your transaction and it will be manually entered into the system. Please note that manual entry of a Loyalty Rewards
      number is not possible at automated ticket and concessions kiosks.
    </u-accordion>

    <u-accordion header="What if I forget both my Loyalty Rewards card and my Loyalty Rewards number?">
      If you forget your Loyalty Rewards card and your Loyalty Rewards number, please ask a box office attendant or concession person at any participating
      Loyalty Rewards theatre for assistance. You may also email us at
      <nuxt-link
        class="link"
        to="mailto:loyaltyrewards@uecmovies.com"
      >
        loyaltyrewards@uecmovies.com
      </nuxt-link>
    </u-accordion>

    <u-accordion header="Do I need to present identification when I use my Loyalty Rewards card?">
      You do not need to present identification when using your Loyalty Rewards card. Your Loyalty Rewards card or Loyalty Rewards number is all that we
      require.
    </u-accordion>

    <u-accordion header="Can I transfer my Loyalty Rewards card to another family member or friend to use?">
      Your Loyalty Rewards card is non-transferable.
    </u-accordion>

    <u-accordion header="How do I get a new Loyalty Rewards card if mine is lost or damaged?">
      You may obtain a replacement Loyalty Rewards card from the box office at any participating Loyalty Rewards location. You will be required to present a
      photo ID to receive a replacement card. Your current point total and transaction history will transfer to the new card within 72 hours of the replacement
      card being issued.
    </u-accordion>

    <u-accordion header="What do I get when I redeem my points?">
      Rewards earned are printed on the receipt each time you reach a qualifying point threshold. Rewards include free popcorn, soft drinks, and movie tickets.
      Concession reward redemptions expire after 100 days.
    </u-accordion>

    <u-accordion header="How do I redeem my points?">
      <p>
        Points will continue to accumulate on the membership card but reward cycle will repeat after each 200 points are earned. That means that the next
        concession reward will become available at 250 points.
      </p>

      <p>
        Once enough points have accumulated on the account to earn a reward, the available reward will be added to the card automatically. Member must
        accumulate 50 points before redeeming their first reward. Rewards can be redeemed at the box office or concession stand as rewards become available.
        Concession reward redemptions expire after 100 days.
      </p>

      <p>
        If rewards are available, a Member may or may not choose to use the reward at the time of purchase. Any redeemed rewards will be immediately deducted
        from the card used during the purchase.
      </p>

      <p>
        Until Online Balance Check is available, Card must be presented at the theatre to find out how many points/rewards are available. Once rewards are
        earned, they will remain available for 60 days from the date earned. Any unused rewards after the 60 days will be forfeited. Under the sole discretion
        of the management of UEC Theatres, points can be refunded if a reward is unavailable or defective. Free ticket rewards cannot be redeemed for “Special
        Engagement” presentations.
      </p>

      <p>
        Due to any unforeseen technical failures that would prevent the earning of points or redemption of rewards, Members are not entitled to compensation.
      </p>

      <p>Once a reward is issued, it may be used in conjunction with a subsequent purchase or transaction.</p>
    </u-accordion>

    <u-accordion header="Does my free movie ticket have any restrictions?">
      Your Loyalty Rewards free ticket reward must be used within 60 days after earning it. The ticket is not valid for special engagements or those prohibited
      by contractual obligations. 3D movies are okay at this time. VIP tickets and other presentations subject to a premium fee are not included in the
      admission provided by the ticket. All premium fees are the responsibility of the Loyalty Rewards member. Free tickets cannot be redeemed for cash. MPAA
      rating guidelines apply.
    </u-accordion>

    <u-accordion header="What rewards am I able to earn after I've accumulated 200 points?">
      After 200 points, the reward schedule restarts. With every additional 50 points you earn, you'll receive a reward voucher. For example, you'll receive a
      free medium fountain drink when you earn 250 points, a free medium popcorn at 300 points and a free movie ticket when you earn 400 points, and so on.
    </u-accordion>

    <u-accordion header="Can I upgrade a free concessions item to a larger or different concessions item and pay the difference?">
      Your reward voucher is good only for the item printed on the voucher. It cannot be exchanged, upgraded, or redeemed for cash.
    </u-accordion>

    <u-accordion header="I made a purchase but forgot to show my Loyalty Rewards card. Is there a way I can receive points for that purchase?">
      Unfortunately, we cannot credit you for past purchases. Your Loyalty Rewards card or number must go through the point of sale system BEFORE the
      transaction is completed to earn points.
    </u-accordion>

    <u-accordion header="Will I earn points at any UEC Theatre?">
      You may use your Loyalty Rewards card to earn points and receive reward vouchers at all participating theatres.
    </u-accordion>

    <u-accordion header="Do I earn points for purchasing gift cards?">
      You do not earn Loyalty Rewards points for purchasing gift cards. However, you will earn points for eligible ticket and concessions purchases paid for
      with gift cards.
    </u-accordion>

    <p>
      See
      <nuxt-link
        class="link"
        to="/loyalty-terms"
      >
        UEC Theatres Loyalty Rewards Program Terms & Conditions </nuxt-link
      >.
    </p>
  </u-container>
</template>
