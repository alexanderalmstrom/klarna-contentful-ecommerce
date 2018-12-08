import { getClient } from './contentful'

export function getCartItems() {
  const cart = getCart()

  const countObj = cart.reduce((acc, curr) => {
    return (acc[curr] = ++acc[curr] || 1), acc
  }, {})

  return getClient()
    .getEntries({
      content_type: 'product',
      'sys.id[in]': cart.join(',')
    })
    .then(payload => {
      const items = payload.items.map(item => {
        item.quantity = countObj[item.sys.id]
        return item
      })

      return items
    })
}

export function addToCart(item) {
  const cart = getCart()

  cart.push(item)

  localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart(id) {
  const cart = getCart()
  const newCart = cart.filter(item => item != id)

  localStorage.setItem('cart', JSON.stringify(newCart))
}

export function getCart() {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : []
}

export function isCartOpen() {
  return document.querySelector('body').classList.contains('is-cart-open')
}

export function openCart() {
  document.querySelector('body').classList.add('is-cart-open')
}

export function closeCart() {
  document.querySelector('body').classList.remove('is-cart-open')
}

export function toggleCart() {
  if (isCartOpen()) {
    closeCart()
  } else {
    openCart()
  }
}
