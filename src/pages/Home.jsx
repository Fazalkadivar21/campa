import Hero from "../components/Hero";
import StoryPara from "../components/StoryPara";
import StoryText from "../components/StoryText";
import Gallary from "../components/Gallary"

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
