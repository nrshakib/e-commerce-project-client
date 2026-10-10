import { Link, useParams } from "react-router-dom";
import type { Product } from "../types/productTypes";
import { useEffect, useState } from "react";

export default function ProductDetailsPage() {
  const baseUrl = import.meta.env.VITE_DJANGO_BASE_URL;

  const { id } = useParams<{ id: string }>();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setError("Product ID is missing.");
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${baseUrl}/products/${id}/`);

        if (!response.ok) {
          throw new Error("Failed to fetch product details.");
        }

        const data: Product = await response.json();
        setSelectedProduct(data);
      } catch (err) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setError(err instanceof Error ? err.message : "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, baseUrl]);

  console.log("selectedProduct", selectedProduct);

  if (loading) {
    return <p>Loading product details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!selectedProduct) {
    return <p>Product not found.</p>;
  }

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 hover:underline text-sm">
        Back to Products
      </Link>

      <div className="flex flex-col w-fit mt-5">
        <h1>Name: {selectedProduct.name}</h1>
        <p>
          Price:{" "}
          <span className="text-green-600">৳{selectedProduct.price}</span>
        </p>

        {selectedProduct.image && (
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-20 h-16 rounded-lg"
          />
        )}
        <button className="p-2 rounded-lg mt-4 bg-amber-300">
          Add To Cart
        </button>
      </div>
    </div>
  );
}
