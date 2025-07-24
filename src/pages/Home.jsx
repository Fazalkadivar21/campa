import Hero from "../components/Home/Hero";
import Gallary from "../components/Home/Gallary"
import Video from "../components/Home/Video"
import Socials from "../components/Home/Socials"

const Home = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-20">
      <Hero />
      <Video />
      <Socials />
      <Gallary />
    </div>
  );
};

export default Home;
