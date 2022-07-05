import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import toastMessage from '../../utils/toastMessage'
import '../../styles/AddProducts.css'

export default function AddProducts() {

  const fashion = ["Men's Top Wear", "Men's Bottom Wear", "Women Ethnic", "Women Western", "Men Footwear", "Women Footwear", "Watches and Accessories", "Bags, Suitcases & Luggage"]

  const electronics = ["Audio", "Camera & Accessories", "Laptop Accessories", "Mobile Accessories"]

  const appliances = ["Television", "Washing Machines", "Air Conditioners", "Refrigerators", "Home Appliances"]

  const beauty_toys = ["Beauty & Personal Care", "Men's Grooming", "Baby Care", "Sports & Fitness"]

  const mens = ["Men's T-Shirts", "Men's Casual Shirts", "Men's Formal Shirts", "Men's Kurtas", "Men's Blazers", "Men's Raincot", "Men's Suit"];

  const mens2 = ["Men's Jeans", "Men's Trousers", "Men's Trackpants", "Men's Shorts", "Men's Dhoti", "Men's Ethnic Pyjama", "Men's Cargos"];

  const women = ["Women Sarees", "Women Kurtas & Kurtis", "Ethnic Dresses", "Women Gowns", "Women Lehenga Cholis", "Women Laggings & Patialas", "Women Dupatta"];

  const women2 = ["Women Tops", "Women Dresses", "Women T-shirts & Polo T-shirts", "Women Jeans", "Women Trouser", "Women Jumpsuit"];

  const mens3 = ["Men's Sports Shoes", "Men's Casual Shoes", "Men's Sandals & Floaters", "Men's Slippers & Flip Flops", "Men's Formal Shoes", "Men's Ethnic Shoes"];

  const womens3 = ["Women Flats", "Women Heels", "Women Wedges", "Women Slipper Flip Flops", "Women Casual Shoes", "Women Sports Shoes", "Women Sneakers"];

  const watches = ["Men & Women Watches", "Men & Women Sunglasses", "Wallets", "Men & Women Belts", "Women Fashion Jewellery", "Men Fashion Jewellery"];

  const bags = ["Backpacks", "Suitcases & Trolleys", "Dufflebags", "Handbags", "Travel Accessories"];

  const audio = ["Bluetooth Headphones", "Wired Headphones", "True Wireless Earbuds", "Bluetooth Speakers", "Soundbars", "Home Theatres", "Remote Control"];

  const camera = ["DSLR & Mirrorless", "Camera tripods", "Camera Lenses", "Drone", "Flashes"];

  const laptop = ["Mouse", "Laptop Keyboards", "Router", "Data Cards", "UPS", "USB Gadgets", "Laptop Battery", "Laptop Adapter", "Wireless USB Adapter", "Processor"];

  const mobile = ["Plain Cases", "Designer Cases", "Screen Guards", "Mobile Cable", "Mobile Flash", "Mobile USB Gadget", "Camera Lens Protectors"];

  const television = ["Big Screen TVs", "Smart TVs", "4K UHD TVs", "OLED TVs", "QLED TVs", "Nanocell TVs"];

  const washing = ["Fully Automatic Front Load", "Semi Automatic Top Load", "Fully Automatic Top Load", "Wash Dryers", "Washer Only"];

  const conditioners = ["Inverter ACs", "Split ACs", "Window ACs", "5 Star ACs", "1 Ton ACs", "1.5 Ton ACs"]

  const refrigerators = ["Single Door", "Double Door", "Triple Door", "Side by Side", "4 Door", "Mini Refrigerators"];

  const home_appliances = ["Irons", "Water Purifiers", "Inverters", "Vaccum Cleaners", "Sewing Machines", "Air Purifiers"];

  const beauty_personalCare = ["Bath & Oral Care", "Personal Hygiene", "Eye Makeup", "Face Makeup"];

  const grooming = ["Face Washes", "Beard Oils", "Hair Styling", "Shaving Essentials", "Soaps"];

  const baby = ["Baby Diapers", "Baby Wipes", "Baby Bath & Grooming", "Baby Food"];

  const sports = ["Badminton", "Cricket", "Cycling", "Football", "Fitness Equipments", "Supports"];

  const [top_category, setTop_category] = useState("Fashion")
  const [category, setCategory] = useState("Men's Top Wear")
  const [sub_category, setSub_category] = useState("Men's T-Shirts");

  useEffect(() => {
    if (top_category === 'Fashion') {
      setCategory("Men's Top Wear")
      setSub_category("Men's T-Shirts")
    }
    else if (top_category === 'Electronics') {
      setCategory("Audio")
      setSub_category("Bluetooth Headphones")
    }
    else if (top_category === 'Appliances') {
      setCategory("Television")
      setSub_category("Big Screen TVs")
    } else {
      setCategory("Beauty & Personal Care")
      setSub_category("Bath & Oral Care")
    }
  }, [top_category])

  useEffect(() => {
    if (category === "Men's Top Wear") {
      setSub_category("Men's T-Shirts")
    } else if (category === "Men's Bottom Wear") {
      setSub_category("Men's Jeans")
    } else if (category === "Women Ethnic") {
      setSub_category("Women Sarees")
    } else if (category === "Women Western") {
      setSub_category("Women Tops")
    } else if (category === "Men Footwear") {
      setSub_category("Men's Sports Shoes")
    } else if (category === "Women Footwear") {
      setSub_category("Women Flats")
    } else if (category === "Watches and Accessories") {
      setSub_category("Men & Women Watches")
    } else if (category === "Bags, Suitcases & Luggage") {
      setSub_category("Backpacks")
    } else if (category === "Audio") {
      setSub_category("Bluetooth Headphones")
    } else if (category === "Camera & Accessories") {
      setSub_category("DSLR & Mirrorless")
    } else if (category === "Laptop Accessories") {
      setSub_category("Mouse")
    } else if (category === "Mobile Accessories") {
      setSub_category("Plain Cases")
    } else if (category === "Television") {
      setSub_category("Big Screen TVs")
    } else if (category === "Washing Machines") {
      setSub_category("Fully Automatic Front Load")
    } else if (category === "Air Conditioners") {
      setSub_category("Inverter ACs")
    } else if (category === "Refrigerators") {
      setSub_category("Single Door")
    } else if (category === "Home Appliances") {
      setSub_category("Irons")
    } else if (category === "Beauty & Personal Care") {
      setSub_category("Bath & Oral Care")
    } else if (category === "Men's Grooming") {
      setSub_category("Face Washes")
    } else if (category === "Baby Care") {
      setSub_category("Baby Diapers")
    } else {
      setSub_category("Badminton")
    }
  }, [category])

  const { authtoken } = useSelector((state) => state.userReducer);

  const [data, setData] = useState({
    authtoken: authtoken,
    title: null,
    category_title: sub_category,
    quantity: null,
    sale_price: null,
    list_price: null,
    description: null,
    main_image_url: null,
    size: null
  })

  let handleChange = (e) => {
    if (e.target.id === 'category_top')
      setTop_category(e.target.value)
    else if (e.target.id === 'category')
      setCategory(e.target.value)
    else
      setSub_category(e.target.value)
    setData({ ...data, [e.target.id]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5500/api/admin/addProduct', data)
      .then(res => {
        if (res.status === 201)
          toastMessage("Product Added Successfully", "success")
        else
          toastMessage("Oops! Something went wrong", "error")
      })
      .catch(() => toastMessage("Internal Server Error", "error"))
  }

  return (
    <div className='container-fluid py-3'>
      <div style={{ backgroundColor: 'white' }}>
        <h2 className='text-center py-3'>Add Product</h2>
        <form className='add-product-form' onSubmit={(e) => handleSubmit(e)}>
          <div className='container-fluid first_div'>
            <div>
              <label>Top-Category &nbsp;</label>
              <select name='category_top' id='category_top' onChange={(e) => handleChange(e)}>
                <option value="Fashion">Fashion</option>
                <option value="Electronics">Electronics</option>
                <option value="Appliances">Appliances</option>
                <option value="Beauty, Toys & More">Beauty, Toys & More</option>
              </select>
            </div>
            <div>
              <label>Category &nbsp;</label>
              <select name='category' id='category' onChange={(e) => handleChange(e)}>
                {top_category === "Fashion" ? fashion.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {top_category === "Electronics" ? electronics.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {top_category === "Appliances" ? appliances.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {top_category === "Beauty, Toys & More" ? beauty_toys.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
              </select>
            </div>
            <div>
              <label>Sub-Category &nbsp;</label>
              <select name='sub_category' id='sub_category' onChange={(e) => handleChange(e)}>
                {category === "Men's Top Wear" ? mens.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Men's Bottom Wear" ? mens2.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Women Ethnic" ? women.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Women Western" ? women2.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Men Footwear" ? mens3.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Women Footwear" ? womens3.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Watches and Accessories" ? watches.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Bags, Suitcases & Luggage" ? bags.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Audio" ? audio.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Camera & Accessories" ? camera.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Laptop Accessories" ? laptop.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Mobile Accessories" ? mobile.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Television" ? television.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Washing Machines" ? washing.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Air Conditioners" ? conditioners.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Refrigerators" ? refrigerators.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Home Appliances" ? home_appliances.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Beauty & Personal Care" ? beauty_personalCare.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Men's Grooming" ? grooming.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Baby Care" ? baby.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
                {category === "Sports & Fitness" ? sports.map((value, index) => {
                  return <option value={value} key={index}>{value}</option>
                }) : null}
              </select>
            </div>
          </div>
          <div className='container-fluid second_div'>
            <div>
              <label>Product Name &nbsp;</label>
              <input type="text" name='title' id='title' onChange={handleChange} required />
            </div>
            <div>
              <label>Quantity &nbsp;</label>
              <input type="number" name='quantity' id='quantity' required onChange={handleChange} />
            </div>
            <div>
              <label>&nbsp; &nbsp; Sale&nbsp; Price &nbsp; &nbsp;</label>
              <input type="number" name='sale_price' id='sale_price' required onChange={handleChange} />
            </div>
            <div>
              <label>List Price &nbsp;&nbsp;</label>
              <input type="number" name='list_price' id='list_price' required onChange={handleChange} />
            </div>
          </div>
          <div className='container-fluid'>
            <label>Description &nbsp; &nbsp; &nbsp;</label>
            <textarea name='description' id='description' rows={3} cols={73} required onChange={handleChange} />
          </div>
          <div className='container-fluid'>
            <label>Images &nbsp;</label>
          </div>
          <div className='container-fluid third_div'>
            <input type="url" name='main_image_url' id='main_image_url' placeholder='main image url' required onChange={handleChange} />
          </div>

          <div className='container-fluid'>
            <label>Size &nbsp;</label>
            <input type="text" name='size' id='size' placeholder='enter size if apply on product' onChange={handleChange} />
          </div>
          <div className='container-fluid text-center py-2'>
            <button className='btn btn-primary' type='submit'>Sumbit</button>
          </div>
        </form>
      </div>
    </div>
  )
}
