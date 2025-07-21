import Hero from "../components/Home/Hero";
import StoryPara from "../components/Home/StoryPara";
import StoryText from "../components/Home/StoryText";
import Gallary from "../components/Home/Gallary"

const Home = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-20">
      <Hero />
      <StoryText />
      <StoryPara />
      <Gallary />
    </div>
  );
};

export default Home;
