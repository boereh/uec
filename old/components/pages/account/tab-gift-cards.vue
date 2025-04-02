<script setup lang="ts">
import states from "~/assets/scripts/theatres";
import type { RuleFn } from "~/assets/scripts/types/form";

type EditForm = {
  id: null | string;
  enabled: boolean;
};

const newFormRules: Record<string, RuleFn[]> = {
  email: [
    (value: string) => {
      if (value.trim() === "") return "Required";
    },
    (value: string) => {
      if (value.length < 6) return "Too short (twss)";
    },
  ],
};

const newFormEmpty = {
  enabled: false,
  number: "",
  name: "",
  email: "",
  gender: "",
  birth: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
};

const cards = useLoyaltyCards();
const newForm = reactive(newFormEmpty);
const editForm = reactive<EditForm>({
  id: null,
  enabled: false,
});
</script>

<template>
  <p class="dark:text-white/50">
    All your UEC Theatres gift cards in one place. You can link, update, or
    remove a linked gift card. FREE Loyalty Rewards cards can only be obtained
    in-person at the UEC Theatre Box Office with your name, valid email address
    and phone number.
  </p>

  <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
    <div
      v-for="card of cards"
      :key="card.number"
      class="dark:bg-dark-500 border dark:border-dark-300 p-4 aspect-video flex flex-col items-center justify-center gap-2 rounded-md relative"
    >
      <div
        class="block absolute h-full w-2/3 bg-gradient-to-t from-brand-red-darker/50 via-brand-red to-brand-red-darker/50 top-0 left-1/2 -translate-x-1/2 transform -skew-x-20"
      />
      <svg-card class="left-0 top-0 absolute w-full h-full opacity-25" />

      <button class="z-1 absolute right-2 bottom-2 p-2 text-md" @click="">
        <icon name="fluent:edit-20-regular" />
      </button>

      <span class="z-1">{{ card.name }}</span>

      <span class="z-1 flex items-center">
        <span class="text-5xl font-bold">
          {{ card.points }}
        </span>

        <span class="text-xs text-white/70">points</span>
      </span>

      <span class="z-1">{{ card.number }}</span>
    </div>

    <button
      :class="[
        'aspect-video flex justify-center items-center gap-2 transition-default',
        'border border-dashed dark:border-dark-300 hover:dark:border-dark-50 active:dark:border-brand-red',
        'dark:text-white/70 hover:dark:text-white active:dark:text-brand-red',
      ]"
      @click="newForm.enabled = true"
    >
      <icon name="fluent:add-16-regular" />

      Add Card
    </button>
  </div>

  <u-modal
    v-model:visible="newForm.enabled"
    title="Add Gift Card"
    :bg-closable="false"
  >
    <u-form :model="newForm" :rules="newFormRules">
      <u-form-item label="Card Number" required>
        <u-input v-model:value="newForm.number" />
      </u-form-item>

      <u-form-item label="Full Name" required>
        <u-input v-model:value="newForm.name" />
      </u-form-item>

      <u-form-item label="Email" name="email" required>
        <u-input v-model:value="newForm.email" />
      </u-form-item>

      <u-form-item label="Street Address" required>
        <u-input v-model:value="newForm.street" />
      </u-form-item>

      <div class="grid grid-cols-2 gap-4">
        <u-form-item label="City" required>
          <u-input v-model:value="newForm.city" />
        </u-form-item>

        <u-form-item label="State" required>
          <u-select v-model:value="newForm.state" :options="states" />
        </u-form-item>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <u-form-item label="Zip Code" required>
          <u-input v-model:value="newForm.zip" />
        </u-form-item>

        <u-form-item label="Phone" required>
          <u-input v-model:value="newForm.phone" />
        </u-form-item>
      </div>

      <u-form-item>
        <u-button>Add card</u-button>
      </u-form-item>
    </u-form>
  </u-modal>
</template>
