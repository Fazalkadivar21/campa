import Hero from "../components/Hero";
import NowServing from "../components/NowServing";
import StoryPara from "../components/StoryPara";
import StoryText from "../components/StoryText";

const Home = () => {
  return (
    <div className="overflow-hidden flex flex-col items-center justify-center gap-20">
      <Hero />
      <StoryText />
      <StoryPara />
      <NowServing />
    </div>
  );
};

export default Home;
