import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function Products() {

  const [open, setOpen] = useState(true)
  const [data, setData] = useState([])
  const [titles, setTitles] = useState([])
  const [ref, setRef] = useState(true)

  const { authtoken } = useSelector((state) => state.userReducer);

  useEffect(() => {
    let mounted = true
    axios.post('http://localhost:5500/api/admin/fetchAllProducts', { authtoken })
      .then(result => {
        if (mounted) {
          setData(result.data.products)
          setTitles(result.data.titles)
        }
      })
    return () => mounted = false
  }, [ref, open])

  const [product_id, setProductId] = useState(null)
  const [product_name, setProductName] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const [price, setPrice] = useState(null)
  const [list_price, setListPrice] = useState(null)
  const [description, setDescription] = useState(null)
  const [main_image_url, setMainImageUrl] = useState(null)
  const [size, setSize] = useState(null)

  const [updatedDataTitle, setUpdatedDataTitle] = useState(null)
  const [updatedDataCategoryTitle, setUpdatedDataCategoryTitle] = useState(null)
  const [updatedDataQuantity, setUpdatedDataQuantity] = useState(null)
  const [updatedDataSalePrice, setUpdatedDataSalePrice] = useState(null)
  const [updatedDataListPrice, setUpdatedDataListPrice] = useState(null)
  const [updatedDataDescription, setUpdatedDataDescription] = useState(null)
  const [updatedDataMainImage, setUpdatedDataMainImage] = useState(null)
  const [updatedDataSize, setUpdatedDataSize] = useState(null)

  const handleOnClick = (id) => {
    setProductId(id)
    setUpdatedDataCategoryTitle(data.filter((ele) => ele.product_id === id)[0].category)
    setProductName(data.filter((ele) => ele.product_id === id)[0].title)
    setUpdatedDataTitle(data.filter((ele) => ele.product_id === id)[0].title)

    setQuantity(data.filter((ele) => ele.product_id === id)[0].quantity)
    setUpdatedDataQuantity(data.filter((ele) => ele.product_id === id)[0].quantity)

    setPrice(data.filter((ele) => ele.product_id === id)[0].price)
    setUpdatedDataSalePrice(data.filter((ele) => ele.product_id === id)[0].price)

    setDescription(data.filter((ele) => ele.product_id === id)[0].description)
    setUpdatedDataDescription(data.filter((ele) => ele.product_id === id)[0].description)

    setMainImageUrl(data.filter((ele) => ele.product_id === id)[0].main_image_url)
    setUpdatedDataMainImage(data.filter((ele) => ele.product_id === id)[0].main_image_url)

    let list_price = data.filter((ele) => ele.product_id === id)[0].price * 100 / (100 - Number((String(data.filter((ele) => ele.product_id === id)[0].discount)).substring(0, 4)))
    setListPrice(Math.round(list_price))
    setUpdatedDataListPrice(Math.round(list_price))

    setSize(data.filter((ele) => ele.product_id === id)[0].size)
    setUpdatedDataSize(data.filter((ele) => ele.product_id === id)[0].size)
    setOpen(false)
  }

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product') === true) {
      axios.post('http://localhost:5500/api/admin/deleteProduct', { id, authtoken }).then(() => setRef(!ref))
    }
  }

  const handleChange = (e) => {
    if (e.target.id === 'title')
      setUpdatedDataTitle(e.target.value)
    else if (e.target.id === 'quantity')
      setUpdatedDataQuantity(e.target.value)
    else if (e.target.id === 'sale_price')
      setUpdatedDataSalePrice(e.target.value)
    else if (e.target.id === 'list_price')
      setUpdatedDataListPrice(e.target.value)
    else if (e.target.id === 'description')
      setUpdatedDataDescription(e.target.value)
    else if (e.target.id === 'main_image_url')
      setUpdatedDataMainImage(e.target.value)
    else
      setUpdatedDataSize(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:5500/api/admin/updateProduct', {
      authtoken: authtoken, category_title: updatedDataCategoryTitle, product_id: product_id,
      product_name: updatedDataTitle, quantity: updatedDataQuantity, sale_price: updatedDataSalePrice,
      list_price: updatedDataListPrice, description: updatedDataDescription, main_image_url: updatedDataMainImage,
      size: updatedDataSize
    }).then(() => setOpen(true))
  }

  function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = 'sep=,' + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
      var row = "";

      //This loop will extract the label from 1st index of on array
      for (var index in arrData[0]) {

        //Now convert each value to string and comma-seprated
        row += index + ',';
      }

      row = row.slice(0, -1);

      //append Label row with line break
      CSV += row + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
      var row = "";

      //2nd loop will extract each column and convert it in string comma-seprated
      for (var index in arrData[i]) {
        if (arrData[i][index] === null || arrData[i][index] === 'null')
          row += '"' + 'Not Available' + '",';
        else
          row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + '\r\n';
    }

    if (CSV === '') {
      alert("Invalid data");
      return;
    }

    //Generate a file name
    var fileName = "";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const downloadProducts = () => {
    JSONToCSVConvertor(data, "Product Report", true);
  }

  return (
    open ? (
      <>
        <div className='mb-3'>
          <button className='btn btn-primary btn-sm' onClick={downloadProducts}>Download Products</button>
        </div>
        <div className='inventory-div-1 pt-2'>
          <h4 className='text-center'>Id</h4>
          <h4 className='text-center'>Name</h4>
          <h4 className='text-center'>Quantity</h4>
          <h4 className='text-center'>Price</h4>
          <h4 className='text-center'>Image</h4>
          <h4 className='text-center'>Update</h4>
          <h4 className='text-center'>Delete</h4>
          {data.map((ele, index) => {
            return ([<h6 className='text-center' key={index + data.length}>{ele.product_id}</h6>,
            <h6 className='text-center' key={index + data.length + 1}>{ele.title}</h6>,
            <h6 className='text-center' key={index + data.length + 2}>{ele.quantity}</h6>,
            <h6 className='text-center' key={index + data.length + 3}>{ele.price}</h6>,
            <div className='text-center' key={index + data.length + 4}>
              <img src={`${ele.main_image_url}`} height="50px" width="100px" alt='main_image'></img>
            </div>,
            <button className='btn btn-warning btn-sm mx-3 my-2' onClick={() => handleOnClick(ele.product_id)} key={index + data.length + 5}>Edit</button>,
            <button className='btn btn-danger btn-sm mx-3 my-2' onClick={() => deleteProduct(ele.product_id)} key={index + data.length + 6}>Delete</button>
            ])
          })}
        </div>
      </>
    ) : (
      <div className='container-fluid py-3'>
        <div style={{ backgroundColor: 'white' }}>
          <h2 className='text-center py-3'>Update Product</h2>
          <form className='add-product-form' onSubmit={handleSubmit}>
            <div className='container-fluid second_div'>
              <div>
                <label>Product Name &nbsp;</label>
                <input type="text" name='title' id='title' defaultValue={product_name} onChange={handleChange} required />
              </div>
              <div>
                <label>Quantity &nbsp;</label>
                <input type="number" name='quantity' id='quantity' defaultValue={quantity} onChange={handleChange} required />
              </div>
              <div>
                <label>&nbsp; &nbsp; Sale&nbsp; Price &nbsp; &nbsp;</label>
                <input type="number" name='sale_price' id='sale_price' defaultValue={price} onChange={handleChange} required />
              </div>
              <div>
                <label>List Price &nbsp;&nbsp;</label>
                <input type="number" name='list_price' id='list_price' defaultValue={list_price} onChange={handleChange} required />
              </div>
            </div>
            <div className='container-fluid'>
              <label>Description &nbsp; &nbsp; &nbsp;</label>
              <textarea name='description' id='description' rows={3} cols={73} defaultValue={description} onChange={handleChange} required />
            </div>
            <div className='container-fluid'>
              <label>Images &nbsp;</label>
            </div>
            <div className='container-fluid third_div'>
              <input type="url" name='main_image_url' id='main_image_url' placeholder='main image url' defaultValue={main_image_url} required onChange={handleChange} />
            </div>

            <div className='container-fluid'>
              <label>Size &nbsp;</label>
              <input type="text" name='size' id='size' placeholder='enter size if apply on product' />
            </div>
            <div className='container-fluid text-center py-2'>
              <button className='btn btn-success mx-2' type='submit'>Update</button>
              <button className='btn btn-danger' type='button' onClick={() => setOpen(true)}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    )
  )
}