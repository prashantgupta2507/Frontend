import React from 'react'
import { Link } from "react-router-dom";

export default function SubCategory (props){
    
    const {category,name} = props;
    return (
        <li>
            <Link className="dropdown-item" to="/">{name} &nbsp;&nbsp; &raquo;</Link>
            <ul className="dropdown-menu dropdown-submenu">
                {category.map((value, index) => {
                    return <li key={index}><Link className="dropdown-item" to={`/products/${value}`}>{value}</Link></li>
                })}
            </ul>
        </li>
    )
}