import Hero from "../components/Home/Hero";
import Gallary from "../components/Home/Gallary"

const Home = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-20">
      <Hero />
      <Gallary />
    </div>
  );
};

export default Home;
