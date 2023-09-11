<script setup lang="ts">
import concessions from 'assets/json/concessions.json'
import partners from 'assets/json/partners.json'

useHead({
    title: 'About Us - UEC Theatres',
})
</script>

<template>
    <u-container div-class="space-y-12">
        <h1>About UEC</h1>

        <section id="company">
            <h2>Company</h2>

            <div class="text-white/70">
                <p>
                    United Entertainment Corp. owns and operates a chain of
                    movie theatres throughout the United States.
                </p>

                <p>
                    The Company mission is to provide high quality entertainment
                    at reasonable prices to the markets it serves.
                </p>

                <p>
                    United Entertainment takes pride in bringing the magic of
                    movies and new jobs to communities.
                </p>

                <p>
                    UEC Theatres is a Top 30 theatre circuit in the United
                    States with 191 screens at 22 complexes. With operations in
                    13 states currently, from east coast to west coast, UEC
                    remains poised for growth.
                </p>

                <p>
                    Founded in 1991, privately held United Entertainment Corp.
                    started exclusively as a video store chain and grew to 25
                    video stores at its peak. Meanwhile, the decision was made
                    to diversify into the theatre business. The first UEC
                    theatre was built in 1997 and the theatre side of the
                    business has grown steadily since.
                </p>

                <p>
                    We acquire, develop and operate multi-screen cinemas in
                    small and midsized markets throughout the United States.
                    While UEC owns nearly all its land and buildings, we are
                    open to the possibility of leasing too. If you are
                    interested in selling your theatre or theatres, are
                    developing a new theatre for lease or have land in a city
                    that needs a theatre, please check out UEC's Development
                    page for information.
                </p>

                <p>
                    For more information about United Entertainment Corp. or UEC
                    Theatres, visit Contact Us.
                </p>

                <p>United Entertainment Corp. corporate office:</p>

                <p>
                    12900 63rd Ave N
                    <br />
                    Maple Grove, MN 55369
                    <br />
                    Phone: (320) 203-1003
                </p>
            </div>
        </section>

        <section id="development">
            <h2>Development</h2>

            <div class="text-white/70">
                <p>
                    United Entertainment plans on continued growth in markets
                    throughout the United States.
                </p>

                <p>
                    Nearly all United Entertainment Theatres have stadium
                    seating and digital sound.
                </p>

                <p>
                    All recent and future theaters have and will have state of
                    the art equipment and stadium seating.
                </p>

                <p>
                    If you are a developer, and are interested in proposing a
                    site, please contact:
                </p>

                <p>
                    Michael Ross - President
                    <br />
                    12900 63rd Ave N
                    <br />
                    Maple Grove, MN 55369
                </p>

                <p>
                    Currently, United Entertainment owns nearly all of its real
                    estate. The Company typically has purchased land and owned
                    all the buildings and equipment. However, going forward the
                    company is open to the possibility of leasing.
                </p>
            </div>
        </section>

        <section id="partners">
            <h2>Partners</h2>

            <div class="text-white/70">
                <p>
                    If you are interested in a relationship with UEC Theatres,
                    please use the
                    <nuxt-link to="/contact-us" class="link">
                        Contact Us
                    </nuxt-link>
                    page to send us a message.
                </p>

                <p>
                    UEC Theatres is proud to be in partnership with the
                    following:
                </p>

                <div
                    class="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-4 sm:gap-8"
                >
                    <nuxt-link
                        v-for="partner of partners"
                        :key="partner.name"
                        class="flex items-center justify-center"
                        :title="partner.name"
                        :to="partner.to"
                    >
                        <img :src="partner.img" :alt="partner.name" />
                    </nuxt-link>
                </div>
            </div>
        </section>

        <section id="advertising">
            <h2>In-Theatre Advertising</h2>

            <div class="text-white/70">
                <p>
                    Call
                    <nuxt-link to="tel:+18007273361" class="link">
                        1-800-SCREEN1,
                    </nuxt-link>
                    email
                    <nuxt-link to="mailto:in-theater@ncm.com" class="link">
                        in-theater@ncm.com,
                    </nuxt-link>
                    or
                    <nuxt-link to="/contact-us" class="link">
                        click here
                    </nuxt-link>
                    lick here to advertise in our theaters. UEC Theatres is a
                    proud affiliate of NCM, the industry-leading network that
                    connects national, regional, and local brands with movie
                    audiences through the big screen, lobby entertainment,
                    digital campaigns, and across social media platforms.
                </p>

                <p>Partner with America's Movie Network and get access to:</p>

                <ul class="list-disc list-inside">
                    <li>
                        Desirable audience: young, social, influential with
                        disposable income
                    </li>
                    <li>Brand adjacency to the best content in the world</li>
                    <li>Incredible reach on the #1 Millennial network</li>
                    <li>
                        The highest rated national and local programming every
                        week
                    </li>
                    <li>
                        36% higher ad engagement over live sports and primetime
                        TV
                    </li>
                    <li>
                        Turnkey planning, buying, and posting - all fully backed
                        by Nielsen
                    </li>
                    <li>
                        A committed partner in achieving your marketing
                        objectives
                    </li>
                </ul>

                <p>
                    Contact us today to learn more about how you can benefit
                    from advertising with NCM, America's Movie Network.
                </p>
            </div>
        </section>

        <section id="concessions">
            <h2>Concessions</h2>

            <div class="text-white/70">
                <p>
                    Most people will agree that movies and snacks go hand in
                    hand. UEC Theatres understands that high quality food and
                    drink items are an integral part of the movie-going
                    experience. When you walk into a UEC Theatre, be prepared to
                    overwhelm your senses with the distinct smell of fresh
                    popped theatre popcorn.
                </p>

                <p>
                    UEC Theatres carries many of the most iconic and well-known
                    concession brands including Coca-Cola fountain soft drinks
                    and frozen beverages and candy. Many locations have expanded
                    food menu options which may include hot dogs, hamburgers,
                    pretzel bites, nachos and pizza. Cooked in a restaurant
                    quality Turbo Chef oven for speed and freshness, you will be
                    surprised by how good the food is.
                </p>

                <p>
                    We are continually adding a wider selection of food to our
                    theatres so please stop back.
                </p>

                <div
                    class="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-10 gap-4 sm:gap-8"
                >
                    <span
                        v-for="concession of concessions"
                        :key="concession.name"
                        class="flex items-center justify-center"
                        :title="concession.name"
                    >
                        <img :src="concession.src" :alt="concession.name" />
                    </span>
                </div>
            </div>
        </section>

        <section id="carrers">
            <h2>Careers at UEC</h2>

            <div class="text-white/70">
                <p>Cashiers, Ushers, Concession, Managers</p>

                <p>
                    United Entertainment is always looking for highly motivated
                    people for management and operations positions at our movie
                    theatres.
                </p>

                <p>
                    Join the United Entertainment team and enjoy the following
                    benefits:
                </p>

                <ul class="list-disc list-inside">
                    <li>Free Movies</li>
                    <li>Flexible Hours</li>
                    <li>Fun Work Environment</li>
                    <li>Career Advancement Opportunities</li>
                </ul>

                <br />

                <p>
                    <nuxt-link
                        class="link"
                        to="https://www.uecmovies.com/content/assets/docs/UECemploymentapp.pdf"
                    >
                        Click here for application
                    </nuxt-link>
                    - Please print off the application here, fill it out and
                    return it to your local UEC Theatre.
                </p>

                <p>
                    <b>Management Opportunities</b>

                    <br />

                    United Entertainment continues to expand and is always
                    looking for qualified candidates. Please send your resume to
                    our corporate office at:
                </p>

                <p>
                    United Entertainment Corp.
                    <br />
                    Attn. Human Resources
                    <br />
                    12900 63rd Ave N
                    <br />
                    Maple Grove, MN 55369
                </p>

                <p>
                    Please send a completed application along with your resume,
                    cover letter and references to
                    <nuxt-link class="link" to="mailto:comments@uecmovies.com">
                        comments@uecmovies.com
                    </nuxt-link>
                    or Fax to 320.203.1229.
                </p>
            </div>
        </section>
    </u-container>
</template>
