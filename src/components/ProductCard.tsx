import type { Product } from "../types/productTypes";

export default function ProductCard(product: Product) {
  const baseUrl = import.meta.env.VITE_IMAGE_BASE_URL;

  console.log("product", product);
  return (
    <div className="border border-gray-300 p-4 rounded-md shadow-md">
      <h2>{product.name}</h2>
      <p>${Number(product.price).toFixed(2)}</p>
      {product.image && (
        <img
          src={`${baseUrl}${product.image}`}
          alt={product.name}
          className="w-32 h-24 object-cover"
        />
      )}
    </div>
  );
}
