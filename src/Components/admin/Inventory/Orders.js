import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import '../../../styles/Inventory.css'

export default function Orders() {

  const { authtoken } = useSelector((state) => state.userReducer);
  const [data, setData] = useState([])

  useEffect(() => {
    let mounted = true
    axios.post('http://localhost:5500/api/admin/fetchAllOrders', { authtoken })
      .then(result => {
        if (mounted) {
          setData(result.data.orders)
        }
      })
    return () => mounted = false
  }, [data])

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
        if (arrData[i][index] == null || arrData[i][index] == 'null')
          row += '"' + 'Not Available' + '",';
        else
          row += '"' + arrData[i][index] + '",';
      }

      row.slice(0, row.length - 1);

      //add a line break after each row
      CSV += row + '\r\n';
    }

    if (CSV == '') {
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

  const downloadOrders = () => {
    JSONToCSVConvertor(data, "Order Report", true);
  }

  return (
    <>
      <div className='mb-3'>
        <button className='btn btn-primary btn-sm' onClick={downloadOrders}>Download Orders</button>
      </div>
      <div className='inventory-div-2 pt-2'>
        <h4 className='text-center'>Products name</h4>
        <h4 className='text-center'>Buyer name</h4>
        <h4 className='text-center'>Total Price</h4>
        <h4 className='text-center'>Products Quantity</h4>
        {data.map((value, index) => {
          return (
            [<h6 key={index + data.length} className='text-center'>{value['Products Name']}</h6>,
            <h6 key={index + data.length + 1} className='text-center'>{value.name}</h6>,
            <h6 key={index + data.length + 2} className='text-center'>{value['Total Price']}</h6>,
            <h6 key={index + data.length + 3} className='text-center'>{value['Products Quantity']}</h6>]
          )
        })}
      </div>
    </>
  )
}
