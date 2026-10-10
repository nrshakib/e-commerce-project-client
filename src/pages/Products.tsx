import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import type { Product } from "../types/productTypes";

export default function Products() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoadung] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    fetch(`${baseUrl}/products/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoadung(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoadung(false);
      });
  }, []);

  console.log("products", products);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-3">
      <div>
        <p className="text-2xl font-bold text-center bg-gray-200 py-3">
          Product List
        </p>
        <div className="flex items-center gap-4 mt-5">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
}
