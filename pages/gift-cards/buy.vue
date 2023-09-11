<script setup lang="ts">
const form = reactive({
    value: 10,
    quantity: 1,
})
</script>

<template>
    <u-container>
        <h1>Buy Gift Cards</h1>

        <p>
            UEC Gift Cards can be ordered online and mailed directly to the
            recipient. Limit 50 gift cards per online order. To order more than
            50 gift cards, please contact giftcards@uecmovies.com and be sure to
            provide your contact information.
        </p>

        <p>
            Gift Cards and movie tickets from different theaters cannot be
            purchased in the same transaction; however, Gift Cards and movie
            tickets from the same theater can be purchased together.
        </p>

        <div class="p-4 border dark:border-dark-300 dark:bg-dark-700">
            <u-form>
                <div class="grid md:grid-cols-2 gap-4 sm:gap-8">
                    <u-form-item label="Gift Card Value" required>
                        <u-input-number v-model:value="form.value" />

                        <u-slider
                            v-model:value="form.value"
                            :min="10"
                            :max="100"
                            :step="0.01"
                        />
                    </u-form-item>

                    <u-form-item label="Quantity" required>
                        <u-input-number v-model:value="form.quantity" />
                    </u-form-item>
                </div>
            </u-form>
        </div>

        {{ form }}
    </u-container>
</template>
