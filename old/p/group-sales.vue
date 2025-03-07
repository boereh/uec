<script setup lang="ts">
import theatreJSON from "assets/scripts/theatres";

const form = reactive({
  type: "",
  theatre: "",
  org: "",
  name: "",
  email: "",
  phone: undefined,
});
</script>

<template>
  <u-container>
    <h1>Group Sales</h1>

    <p>
      UEC has state of the art auditoriums available to host your next meeting
      or group. Groups of 50 or more may be eligible for discounted rates on
      tickets and concessions. Rent out an entire auditorium or choose a
      regularly advertised showtime and we'll make sure to make your experience
      a special one.
    </p>

    <br />

    <h3 class="flex gap-4 items-center">
      Theatre Rental

      <span class="text-sm font-400">
        <u-button
          size="small"
          href="#form"
          @click="form.type = 'Theatre Rental'"
        >
          Request Event
        </u-button>
      </span>
    </h3>

    <p>
      Host your next meeting in one of UEC's state of the art auditoriums! Take
      advantage of the many amenities UEC theatres can provide
    </p>

    <ul class="list-disc list-inside">
      <li>Free and Ample Parking</li>
      <li>Wall-to-Wall Screens</li>
      <li>Competitive Rates</li>
      <li>Delicious Food, Drinks and Snacks at our Concession Stand</li>
      <li>Superior Acoustics and Presentation</li>
    </ul>

    <br />

    <h3 class="flex gap-4 items-center">
      Church Rental

      <span class="text-sm font-400">
        <u-button
          size="small"
          href="#form"
          @click="form.type = 'Church Rental'"
        >
          Request Event
        </u-button>
      </span>
    </h3>

    <p>
      UEC Theatres are available to host your church gathering. We provide a
      positive and clean environment with plenty of parking and restrooms. Our
      theatres have comfortable seats and perfect acoustics for your church
      service. Our facilities have a variety of auditorium sizes that can
      accommodate large or small church groups.
    </p>

    <br />

    <h3 class="flex gap-4 items-center">
      Private Screenings

      <span class="text-sm font-400">
        <u-button
          size="small"
          href="#form"
          @click="form.type = 'Private Screenings'"
        >
          Request Event
        </u-button>
      </span>
    </h3>

    <p>
      Looking to enjoy a show with your students, employees, clients or
      colleagues at a discounted rate?
    </p>

    <p>
      Groups of 50 or more may qualify for discounts at any UEC location.
      Contact us today to book your group showing.
    </p>

    <br />

    <h3 class="flex gap-4 items-center">
      Birthday Parties

      <span class="text-sm font-400">
        <u-button
          size="small"
          href="#form"
          @click="form.type = 'Birthday Parties'"
        >
          Request Event
        </u-button>
      </span>
    </h3>

    <p>Celebrate your Birthday or Party at UEC Theatres!</p>

    <p>Party Room Rental Includes:</p>

    <ul>
      <li>
        Use of the Party Room for up to 1 ½ hours to open presents, eat cake and
        play party games. Bring your video game system and hook it up to our TV,
        or use our Blu-Ray player to watch team highlight videos.
      </li>
      <li>
        You can use the room either before or after the show based on
        availability.
      </li>
      <li>Free refills on popcorn and drink purchases!</li>
      <li>
        Enjoy your cake or snack, and please&nbsp;clean-up and dispose of trash.
      </li>
      <li>
        Rental also includes the periodic assistance of a staff member to help
        you.
      </li>
      <li>
        All of this for a very reasonable price per person! (Minimum of 8
        people)
      </li>
      <li>
        Amenities and party options vary by location. Please&nbsp;bring it
        up&nbsp;if you have an idea!
      </li>
    </ul>

    <br />

    <u-sheet class="p-4 border dark:border-dark-300 dark:bg-dark-700">
      <h3>Request an Event</h3>

      <u-form id="form">
        <div class="grid sm:grid-cols-3 gap-4 sm:gap-8">
          <u-form-item label="Type" required>
            <u-select
              v-model:value="form.type"
              :options="[
                'Theatre Rental',
                'Church Rental',
                'Private Screenings',
                'Birthday Parties',
              ]"
            />
          </u-form-item>

          <u-form-item label="Theatre" required>
            <u-select
              v-model:value="form.theatre"
              :options="
                theatreJSON.map((x) => ({
                  ...x,
                  text: x.name,
                  value: Number(x.id),
                }))
              "
            />
          </u-form-item>

          <u-form-item label="Company/Organization">
            <u-input v-model:value="form.org" />
          </u-form-item>

          <u-form-item label="Full Name" required>
            <u-input v-model:value="form.name" />
          </u-form-item>

          <u-form-item label="Email" required>
            <u-input v-model:value="form.email" />
          </u-form-item>

          <u-form-item label="Phone" required>
            <u-input-number v-model:value="form.phone" />
          </u-form-item>

          <u-form-item class="sm:col-span-3" label="Details" required>
            <u-textarea
              placeholder="Please provide details about your event request including dates, times, number guests or any other info that would be helpful"
            />
          </u-form-item>

          <u-form-item>
            <u-button
              html-type="submit"
              icon="fluent:checkmark-circle-16-regular"
            >
              Submit Request
            </u-button>
          </u-form-item>
        </div>
      </u-form>
    </u-sheet>
  </u-container>
</template>
