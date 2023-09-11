<script setup lang="ts">
import dayjs from 'dayjs'

type Order = {
    id: string
    movie: string
    date: Date
    tickets: {
        type: string
        price: number
        count: number
    }[]
}

const orders: Order[] = [
    // {
    //     id: '32m4onvakrv123u0v9123n',
    //     movie: 'Blue Beetle',
    //     date: new Date(),
    //     tickets: [
    //         {
    //             type: 'Adult',
    //             price: 8,
    //             count: 2,
    //         },
    //         {
    //             type: 'Child',
    //             price: 6.5,
    //             count: 1,
    //         },
    //     ],
    // },
    // {
    //     id: '243bv32423-04v3io24j4',
    //     movie: 'Barbie',
    //     date: new Date(),
    //     tickets: [
    //         {
    //             type: 'Adult',
    //             price: 11,
    //             count: 1,
    //         },
    //         {
    //             type: 'Child',
    //             price: 7,
    //             count: 1,
    //         },
    //     ],
    // },
]
</script>

<template>
    <div
        :class="[
            'min-h-sm',
            orders.length < 1 ? 'grid place-items-center' : '',
        ]"
    >
        <div v-if="orders.length > 0" class="grid gap-4">
            <div
                v-for="(order, index) of orders"
                :key="order.id"
                :class="[
                    'flex flex-col gap-1',
                    index === orders.length - 1
                        ? ''
                        : 'pb-4 border-b dark:border-dark-300',
                ]"
            >
                <div class="dark:text-white/50 text-xs">{{ order.id }}</div>

                <div class="text-2xl font-bold">{{ order.movie }}</div>

                <div class="flex justify-between gap-4 items-center">
                    <span>
                        {{
                            dayjs(order.date).format('MMM DD, YYYY hh:mm:ss a')
                        }}
                    </span>

                    <span>
                        Total:
                        <span class="text-md">
                            {{
                                `$${order.tickets.reduce((x, y) => {
                                    return x + y.price * y.count
                                }, 0)}`
                            }}
                        </span>
                    </span>
                </div>

                <div
                    v-for="ticket of order.tickets"
                    class="flex justify-between items-center gap-4"
                >
                    <span>{{ ticket.type }} x {{ ticket.count }}</span>
                    <hr class="my-0 flex-grow border-dashed" />
                    <span>${{ ticket.price }}</span>
                </div>
            </div>
        </div>

        There are no orders in your order history.
    </div>
</template>
