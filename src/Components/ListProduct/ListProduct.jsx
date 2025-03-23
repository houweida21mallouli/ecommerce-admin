import React, {useEffect, useState} from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {

  const [allproducts,setAllProducts] = useState([]);

  const fetchInfo = async ()=>{
    await fetch('http://localhost:4000/allproducts').then((res)=>res.json()).then((data)=>{setAllProducts(data)});
  }

  useEffect(()=>{
    fetchInfo();
  },[])

  const remove_product = async (id)=>{
    await fetch('http://localhost:4000/removeproduct',{
      method:'POST',
      headers:{
        Accept:'application/json',
        'Content-Type':'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>Liste des produits</h1>
        <div className="listproduct-format-main">
          <p>Produits</p>
          <p>Titre</p>
          <p>Description</p>
          <p>Prix</p>
          <p>Promo Prix</p>
          <p>Categorie</p>
          <p>Supprimer</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allproducts.map((product,index)=>{
            return <>
              <div key={index} className="listproduct-format-main listproduct-format">
                <img src={product.image} alt="" className="listproduct-product-icon" />
                <p>{product.name}</p>
                <p>{product.description}</p>
                <p>DT {product.old_price}</p>
                <p>DT {product.new_price}</p>     
                <p>{product.category}</p>
                <img onClick={()=>{remove_product(product.id)}} src={cross_icon} alt="" className="listproduct-remove-icon" />
              </div>
              <hr />
            </>
          })}
        </div>
    </div>
  )
}

export default ListProduct