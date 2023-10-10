<script setup lang="ts">
import { useDark, watchDebounced } from '@vueuse/core'
import states from 'assets/json/states.json'

const user = useSupabaseUser()
const informationForm = reactive({
	first_name: '',
	last_name: '',
	gender: '',
	birth: '',
	street: '',
	city: '',
	state: '',
	zip: '',
	phone: '',
})

const communicationForm = reactive({
	news: user?.value?.user_metadata?.subscribe_news || false,
	showtimes: user?.value?.user_metadata?.subscribe_showtimes || false,
})

watchDebounced(
	Object.values(toRefs(communicationForm)),
	([news, showtimes]) => {
		// console.log(news, showtimes)
	},
	{
		debounce: 250,
	}
)
</script>

<template>
	<p class="dark:text-white/50">Add or update personal information for the account. Change your subscription options for UEC Theatres communications.</p>

	<h4>Information</h4>

	<u-form>
		<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
			<u-form-item label="First Name">
				<u-input v-model:value="informationForm.first_name" />
			</u-form-item>

			<u-form-item label="Last Name">
				<u-input v-model:value="informationForm.last_name" />
			</u-form-item>

			<u-form-item label="Gender">
				<u-select
					v-model:value="informationForm.gender"
					:options="['Female', 'Male']"
				/>
			</u-form-item>

			<u-form-item label="Birthdate">
				<u-input
					v-model:value="informationForm.birth"
					placeholder="MM/DD/YYYY"
				/>
			</u-form-item>
		</div>

		<u-form-item label="Street Address">
			<u-input v-model:value="informationForm.street" />
		</u-form-item>

		<div class="grid grid-cols-2 gap-4">
			<u-form-item label="City">
				<u-input v-model:value="informationForm.city" />
			</u-form-item>

			<u-form-item label="State">
				<u-select
					v-model:value="informationForm.state"
					:options="states"
				/>
			</u-form-item>
		</div>

		<div class="grid grid-cols-2 gap-4">
			<u-form-item label="Zip Code">
				<u-input v-model:value="informationForm.zip" />
			</u-form-item>

			<u-form-item label="Phone">
				<u-input v-model:value="informationForm.phone" />
			</u-form-item>
		</div>
	</u-form>

	<hr />

	<h4>Communications</h4>

	<u-switch
		rounded
		v-model:value="communicationForm.news"
		label="UEC News"
		text="Read about new and enhanced services, plus get tips on getting the
        most out of your My UEC account."
	/>

	<u-switch
		rounded
		v-model:value="communicationForm.showtimes"
		label="Showtimes & Coming Attractions"
		text="Get updates about upcoming releases and special events."
	/>

	<br />

	<p>
		By clicking "Save Changes", you are indicating that you have read and agree to the
		<nuxt-link
			class="link"
			to="/privacy"
			>Privacy Policy</nuxt-link
		>.
	</p>

	<div>
		<u-button>Save Changes</u-button>
	</div>
</template>
