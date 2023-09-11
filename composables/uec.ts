import { watchDebounced } from '@vueuse/core'
import { Card } from 'assets/scripts/types/account'

const useLoyaltyCardskey = 'uec-loyalty-rewards-cards'

export const useLoyaltyCards = () => {
    const cards = ref<Card[]>([])

    if (!window) return cards

    watchDebounced(
        cards,
        (c) => localStorage.setItem(useLoyaltyCardskey, PublicSign(c)),
        { debounce: 200 }
    )

    const cardsLS = localStorage.getItem(useLoyaltyCardskey)

    if (!cardsLS) return cards

    cards.value = PublicVerify<Card[]>(cardsLS)
}
