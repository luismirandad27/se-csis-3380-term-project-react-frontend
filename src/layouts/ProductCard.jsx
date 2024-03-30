import React from "react";
import Button from "../layouts/Button";
import { useNavigate } from 'react-router-dom'; 
import RatingStars from "../components/Products/ProductRating";

const ProductCard = (props) => {
  const navigate = useNavigate(); 

  const handleClick = () => {
    navigate(`/product/${props.product.prod_id}`); // Navigate to the product details page
  };
  
  return (
    <div className=" w-full lg:w-1/4 bg-orange-50 p-3 rounded-lg text-center h-[375px] ml-10" >
      <img className=" rounded-lg" src={props.img} alt="img"  /> 
      <div className=" flex flex-col items-center mt-5 gap-3" >
        <h2 className=" font-semibold text-xl">{props.product.name}</h2>
        <RatingStars rating={props.product.average_rating} index={props.ind}/>
        <h3 className=" font-semibold text-lg">${(props.product.product_subtypes[0].price)}</h3>
        <Button onClick={handleClick} title={"See more"}/> 
      </div>
    </div>
  );
};

export default ProductCard;
