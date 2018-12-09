import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { connectComponent } from '../connect'
import * as cartServive from '../services/cart'

import './Header.scss'

class Header extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="header">
        <div className="container">
          <div className="site-brand">
            <Link className="site-brand-link" to="/">
              Contentful
            </Link>
          </div>
          <button
            className="cart-btn"
            onClick={cartServive.openCart.bind(this)}>
            Bag <span>{this.props.cart.entries.length}</span>
          </button>
        </div>
      </header>
    )
  }
}

Header.propTypes = {
  cart: PropTypes.object
}

export default connectComponent(Header)
