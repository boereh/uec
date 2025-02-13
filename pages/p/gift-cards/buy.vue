<script setup lang="ts">
import theatresJSON from "assets/scripts/theatres";
import statesJSON from "assets/scripts/theatres";

const theatres = theatresJSON.map((x) => ({
  ...x,
  value: Number(x.id),
  text: x.name,
}));

const form = reactive({
  value: 10,
  quantity: 1,
  type: "",
  theatre: "",
  delivery: "Email",
  date: new Date(),
  sender: "",
  recipient: {
    name: "",
    email: "",
    phone: undefined,
    address: "",
    city: "",
    state: "",
    zip: undefined,
  },
  payment: {
    useAccountAddress: false,
    number: undefined,
    expiration: undefined,
    ccv: undefined,
    name: "",
    address: "",
    city: "",
    state: "",
    zip: undefined,
  },
});
</script>

<template>
  <u-container>
    <h1>Buy Gift Cards</h1>

    <p>
      UEC Gift Cards can be ordered online and mailed directly to the recipient.
      Limit 50 gift cards per online order. To order more than 50 gift cards,
      please contact giftcards@uecmovies.com and be sure to provide your contact
      information.
    </p>

    <p>
      Gift Cards and movie tickets from different theaters cannot be purchased
      in the same transaction; however, Gift Cards and movie tickets from the
      same theater can be purchased together.
    </p>

    <br />

    <div class="p-4 border dark:border-dark-300 dark:bg-dark-700">
      <u-form>
        <h4 class="mt-0">Card information</h4>

        <div
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-11 gap-4 sm:gap-8"
        >
          <u-form-item
            :class="form.type === 'e-Card' ? 'lg:col-span-2' : 'lg:col-span-3'"
            label="Gift Card Value"
            required
          >
            <u-input-number v-model:value="form.value" />

            <u-slider
              v-model:value="form.value"
              :min="10"
              :max="100"
              :step="0.01"
            />
          </u-form-item>

          <u-form-item
            :class="form.type === 'e-Card' ? 'lg:col-span-2' : 'lg:col-span-3'"
            class="lg:col-span-2"
            label="Quantity"
            required
          >
            <u-input-number v-model:value="form.quantity" />
          </u-form-item>

          <u-form-item
            :class="[
              'lg:col-span-3',
              form.type === 'e-Card' && '<md:col-span-2',
            ]"
            label="Theatre"
            required
          >
            <u-select v-model:value="form.theatre" :options="theatres" />
          </u-form-item>

          <u-form-item class="lg:col-span-2" label="Card Type" required>
            <u-select
              v-model:value="form.type"
              :options="['Gift Card', 'e-Card']"
            />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'e-Card'"
            class="lg:col-span-2"
            label="Delivery Option"
            required
          >
            <u-select
              v-model:value="form.delivery"
              :options="['Email', 'Self Deliver', 'Text']"
            />
          </u-form-item>
        </div>

        <h4>Recipient Information</h4>

        <div class="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-8">
          <u-form-item
            :class="['col-span-2 sm:col-span-3']"
            label="Full Name"
            required
          >
            <u-input v-model:value="form.recipient.name" />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'Gift Card'"
            :class="['col-span-2 sm:col-span-3']"
            label="Address"
            required
          >
            <u-input v-model:value="form.recipient.address" />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'Gift Card'"
            :class="['col-span-2 sm:col-span-2']"
            label="City"
            required
          >
            <u-input v-model:value="form.recipient.city" />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'Gift Card'"
            :class="['sm:col-span-2']"
            label="State"
            required
          >
            <u-select
              v-model:value="form.recipient.state"
              :options="statesJSON"
            />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'Gift Card'"
            :class="['sm:col-span-2']"
            label="ZIP"
            required
          >
            <u-input v-model:value="form.recipient.zip" />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'e-Card' && form.delivery === 'Email'"
            class="col-span-2 sm:col-span-3"
            label="Email"
            required
          >
            <u-input v-model:value="form.recipient.email" />
          </u-form-item>

          <u-form-item
            v-show="form.type === 'e-Card' && form.delivery === 'Text'"
            class="col-span-2 sm:col-span-3"
            label="Phone Number"
            required
          >
            <u-input-number v-model:value="form.recipient.phone" />
          </u-form-item>

          <u-form-item
            v-show="
              form.type === 'e-Card' &&
              ['Email', 'Text'].includes(form.delivery)
            "
            class="col-span-2 sm:col-span-3"
            label="Sender Name"
          >
            <u-input v-model:value="form.sender" />
          </u-form-item>

          <u-form-item
            v-show="
              form.type === 'e-Card' &&
              ['Email', 'Text'].includes(form.delivery)
            "
            class="col-span-2 sm:col-span-3"
            label="Date"
          >
            <u-input v-model:value="form.recipient.name" />
          </u-form-item>
        </div>

        <h4>Payment Information</h4>

        <div class="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-8">
          <u-form-item
            class="col-span-2 sm:col-span-3"
            label="Card Number"
            required
          >
            <u-input-number v-model:value="form.payment.number" />
          </u-form-item>

          <u-form-item class="col-span-2" label="Expiration" required>
            <u-input-number v-model:value="form.payment.expiration" />
          </u-form-item>

          <u-form-item class="col-span-1" label="CCV" required>
            <u-input-number v-model:value="form.payment.ccv" />
          </u-form-item>
        </div>

        <h4>Billing Information</h4>

        <u-switch
          v-model:value="form.payment.useAccountAddress"
          label="Use Account Address"
          text="Instead of entering your billing information, you can use the information from your account."
          rounded
        />

        <div
          v-show="!form.payment.useAccountAddress"
          class="grid grid-cols-2 sm:grid-cols-6 gap-4 sm:gap-8"
        >
          <u-form-item
            :class="['col-span-2 sm:col-span-3']"
            label="Name on Card"
            required
          >
            <u-input v-model:value="form.recipient.name" />
          </u-form-item>

          <u-form-item
            :class="['col-span-2 sm:col-span-3']"
            label="Address"
            required
          >
            <u-input v-model:value="form.recipient.address" />
          </u-form-item>

          <u-form-item
            :class="['col-span-2 sm:col-span-2']"
            label="City"
            required
          >
            <u-input v-model:value="form.recipient.city" />
          </u-form-item>

          <u-form-item :class="['sm:col-span-2']" label="State" required>
            <u-select
              v-model:value="form.recipient.state"
              :options="statesJSON"
            />
          </u-form-item>

          <u-form-item :class="['sm:col-span-2']" label="ZIP" required>
            <u-input v-model:value="form.recipient.zip" />
          </u-form-item>
        </div>

        <u-form-item>
          <u-button type="primary" html-type="submit">Purchase</u-button>
        </u-form-item>
      </u-form>
    </div>
  </u-container>
</template>
