import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";

interface ProductProps {
  name: string;
  price: number;
  description: string;
  type: string;
  url: string;
}

export const ProductCard: FC<ProductProps> = ({
  name,
  price,
  description,
  type,
  url
}) => {

  return (
    <div className={`card ${type}`} style={{ width: "18rem" }}>
  <img className="card-img-top" src={url} alt="Card image cap"/>
  <div className="card-body">
    <h5 className="card-title">{name}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text">{price +"$"}</p>
    <a href="#" className="btn btn-primary">Add to cart</a>
  </div>
</div>
  );
};
