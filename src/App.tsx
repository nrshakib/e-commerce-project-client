import { useEffect, useState } from "react";
import type { Product } from "./types/productTypes";
import ProductCard from "./components/ProductCard";

function App() {
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
    <>
      <div>
        <h1>Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>  
      </div>

      <p className="text-5xl">Hello</p>
    </>
  );
}

export default App;
