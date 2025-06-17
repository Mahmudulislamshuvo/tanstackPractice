import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import ProductList from "./components/ProductList";

const App = () => {
  const [showDetails, setshowDetails] = useState(null);

  return (
    <div className="flex m-2">
      <ProductList setshowDetails={setshowDetails} />
      {showDetails && <ProductDetails id={showDetails} />}
    </div>
  );
};

export default App;
