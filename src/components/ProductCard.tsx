import { Link } from "react-router-dom";
import type { Product } from "../types/productTypes";

export default function ProductCard(product: Product) {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  console.log("product", product);
  return (
    <Link
      to={`/products/${product.id}`}
      className="border border-gray-300 p-3 rounded-md shadow-md w-fit"
    >
      <img
        src={`${baseUrl}${product.image}`}
        alt={product.name}
        className="w-32 h-24 object-cover rounded-lg"
      />
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-green-600">${Number(product.price).toFixed(2)}</p>
      </div>
    </Link>
  );
}
