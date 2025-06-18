import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const retrieveProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:3000/products?_page=${queryKey[1].page}&_per_page=6`
  );
  return response.data;
};

const ProductList = ({ setshowDetails }) => {
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", { page }],
    queryFn: retrieveProducts,
  });

  if (isLoading) return <div> Data Fetching...</div>;
  if (error) return <div> an error has been ocard</div>;

  return (
    <>
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
                  src={
                    item.thumbnail
                      ? item.thumbnail
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.title ? item.title : "Product Image"}
                  className="object-cover h-64 w-96 rounded-sm"
                />
                <p className="text-xl my-3">{item.title}</p>
                <button onClick={() => setshowDetails(item.id)}>
                  Show Details
                </button>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex">
        {products.prev && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.prev)}
          >
            {" "}
            Prev{" "}
          </button>
        )}
        {products.next && (
          <button
            className="p-1 mx-1 bg-gray-100 border cursor-pointer rounded-sm"
            onClick={() => setPage(products.next)}
          >
            {" "}
            Next{" "}
          </button>
        )}
      </div>
    </>
  );
};

export default ProductList;
