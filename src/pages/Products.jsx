import Hero from "../components/Products/Hero";
import ProductGrid from "../components/Products/ProductGrid";
import Slider from "../components/Products/Slider";

const Products = () => {
  return (
    <div className="h-fit flex flex-col items-center justify-center">
      <Hero />
      <ProductGrid />
      <Slider/>
    </div>
  );
};

export default Products;
