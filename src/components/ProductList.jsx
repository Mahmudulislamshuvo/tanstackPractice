import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const retriveProducts = async () => {
  const response = await axios.get("http://localhost:3000/products");

  return response.data;
};

const ProductList = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: retriveProducts,
  });

  if (isLoading) return <div> Data Fetching...</div>;
  if (error) return <div> an error has been ocard</div>;

  return (
    <div className="flex flex-col justify-center items-center w-3/5">
      <h1 className="text-3xl my-2">Product List</h1>

      <ul className="flex flex-wrap justify-center items-center">
        {products &&
          products.map((item) => (
            <li
              key={item.id}
              className="flex flex-col items-center m-2 border rounded-sm"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="object-cover h-64 w-96 rounded-sm"
              />
              <p className="text-xl my-3">{item.title}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ProductList;
