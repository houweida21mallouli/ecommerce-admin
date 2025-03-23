import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {

    const [image,setImage] = useState(false);

    const [productDetails,setProductDetails] = useState({
        name:"",
        description:"",
        image:"",
        category:"men",
        new_price:"",
        old_price:""
    });

    const imageHandler = (e) =>{
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) =>{
        setProductDetails({...productDetails, [e.target.name]: e.target.value});
    }

    const Add_Product = async () => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product',image);

        await fetch("http://localhost:4000/upload",{
            method:'POST',
            headers:{
                Accept:'application/json',
            },
            body:formData,
        }).then((resp) => resp.json()).then((data)=>{responseData=data});

        if(responseData.success){
            product.image = responseData.image_url;
            console.log(product);
            await fetch('http://localhost:4000/addproduct',{
                method:'POST',
                headers:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                },
                body:JSON.stringify(product),
            }).then((resp)=>resp.json()).then((data)=>{
                data.success?alert("Produit ajouté"):alert("echoué")
            })
        } 
    };

  return (
    <div className='add-product'>
        <h1>Ajouter des produits</h1>
        <div className="addproduct-itemfield">
            <p>Nom du Produit</p>
            <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Ecrire ici' />
        </div>
        <div className="addproduct-itemfield">
            <p>Description du Produit</p>
            <input value={productDetails.description} onChange={changeHandler} type="text" name='description' placeholder='Ecrire ici la description du produit' />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Prix</p>
                <input value={productDetails.old_price} onChange={changeHandler} type="text" name="old_price" placeholder='Ecrire ici' id="" />
            </div>
            <div className="addproduct-itemfield">
                <p>Promo Prix</p>
                <input value={productDetails.new_price} onChange={changeHandler} type="text" name="new_price" placeholder='Ecrire ici' id="" />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Categorie</p>
            <select value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
            </select>
        </div>
        <div className="addproduct-itemfield">
            <label htmlFor="file-input">
                <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail_img' alt="" />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
        </div>
        <button onClick={()=>{Add_Product()}} className='addproduct-btn'>Ajouter</button>
    </div>
  )
}

export default AddProduct