import { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/products/")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error Fetching Products:", error));
  }, []);

  console.log(products);

  return (
    <>
      <div>
        <h1>Product List</h1>
        {products?.map((product: Product) => (
          <table
            key={product.id}
            className="w-full table-auto border border-gray-300"
          >
            <thead>
              <tr className="bg-gray-200 flex justify-between">
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-gray-300 flex justify-between">
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>

      <p className="text-5xl">Hello</p>
    </>
  );
}

export default App;
