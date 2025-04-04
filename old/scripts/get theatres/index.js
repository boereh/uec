const { JSDOM } = require('jsdom')
const { $fetch } = require('ofetch')
const { readFileSync, writeFileSync } = require('fs')
const theatres = require('./theatre.json')

const theatreURLs = [
  'https://www.uecmovies.com/theatres/details/1002',
  'https://www.uecmovies.com/theatres/details/1004',
  'https://www.uecmovies.com/theatres/details/1005',
  'https://www.uecmovies.com/theatres/details/1006',
  'https://www.uecmovies.com/theatres/details/1007',
  'https://www.uecmovies.com/theatres/details/1008',
  'https://www.uecmovies.com/theatres/details/1009',
  'https://www.uecmovies.com/theatres/details/1010',
  'https://www.uecmovies.com/theatres/details/1011',
  'https://www.uecmovies.com/theatres/details/1012',
  'https://www.uecmovies.com/theatres/details/1013',
  'https://www.uecmovies.com/theatres/details/1014',
  'https://www.uecmovies.com/theatres/details/1015',
  'https://www.uecmovies.com/theatres/details/1016',
  'https://www.uecmovies.com/theatres/details/1017',
  'https://www.uecmovies.com/theatres/details/1021',
  'https://www.uecmovies.com/theatres/details/1026',
  'https://www.uecmovies.com/theatres/details/1029',
  'https://www.uecmovies.com/theatres/details/1030',
  'https://www.uecmovies.com/theatres/details/1032',
  'https://www.uecmovies.com/theatres/details/1034',
  'https://www.uecmovies.com/theatres/details/1035',
]

async function main() {
  const res = await Promise.all(theatreURLs.map((x) => [$fetch(x), x]))

  await Promise.all(res.map(([x, t]) => search(new JSDOM(x), t)))
}

async function search(dom, theatre) {
  const document = dom.window.document
}

main()

async function searches(browser, url) {
  const page = await browser.newPage()
  await page.goto(url)

  const name = await page.$eval('h1', (el) => el.innerText)
  const index = theatres.findIndex((x) => x.name === name)

  if (index < 0) return

  const theatre = theatres[index]

  theatre.id = url.split('/').at(-1)

  theatre.concessions = await page.$$eval('#concessions img', (els) => {
    return [...els].map((el) => el.getAttribute('title'))
  })

  theatre.pricing ??= {}

  function DoPricing(els) {
    const result = {}

    for (const el of [...els].slice(1)) {
      const tds = [...el.querySelectorAll('td')]

      result[tds[0].innerText] = tds[1].innerText
    }

    return result
  }

  try {
    theatre.pricing.matinee = await page.$$eval('#pricing table:nth-of-type(1) tr', DoPricing)

    theatre.pricing.general = await page.$$eval('#pricing table:nth-of-type(2) tr', DoPricing)
  } catch (error) {}

  theatres[index] = theatre

  console.log('done ', index)
}
