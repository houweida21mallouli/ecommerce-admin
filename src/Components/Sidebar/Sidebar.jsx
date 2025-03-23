import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'
import add_product_icon from '../../assets/Product_Cart.svg'
import list_product_icon from '../../assets/Product_list_icon.svg'
import cart_icon from '../../assets/Product_Cart.svg'


const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="" />
                <p>Ajouter un Produit</p>
            </div>
        </Link>

        <Link to={'/listproduct'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={list_product_icon} alt="" />
                <p>Liste de Produits</p>
            </div>
        </Link>
        <Link to={'/orders'} style={{textDecoration:"none"}}>
            <div className="sidebar-item">
                <img src={cart_icon} alt="" />
                <p>Orders</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar