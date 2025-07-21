import React from "react";

const story = [
  {
    heading: "Origins",
    text: "In the heart of a newly independent India, Campa Beverages was founded with a clear purpose: to craft a homegrown refreshment that reflected the spirit and taste of a changing nation. Carefully blended, proudly local, and true to its roots, Campa quickly moved beyond being just a drink to become part of shared moments and everyday life.",
  },
  {
    heading: "Ascent",
    text: "Through the following decades, Campa’s distinctive flavor and quiet confidence earned enduring loyalty. It didn’t rely on slogans or spectacle. Instead, it became a fixture across cinema halls, corner shops, and family gatherings—steadily building its name as an authentic Indian icon.",
  },
  {
    heading: "Eclipse",
    text: "Then came the shift. Global giants entered the market, armed with aggressive marketing, distribution muscle, and deep pockets. Campa, built on legacy but slow to adapt, struggled to keep pace. Shelves that once belonged to Campa began to fill with new international names. Production scaled back. Visibility faded. What was once a household favorite became a nostalgic memory for many.",
  },
  {
    heading: "Renewal",
    text: "Today, Campa Beverages returns, driven by the same commitment to craft that once made it a part of everyday life. Honoring its original recipe while refining it for modern tastes, Campa steps back onto the shelves. Rooted in heritage, ready for a new generation, it offers something simple yet rare: a taste that feels both timeless and entirely its own.",
  },
];

const StoryPara = () => {

  return (
    <div
      className="mt-[10rem] px-5 lg:px-20 max-h-fit w-[96vw] rounded-2xl bg-gold text-black"
    >
      {story.map((section, index) => (
        <React.Fragment key={index}>
          <div className={`${section.heading} h-screen flex items-center justify-center text-[25vw]`}>{section.heading}</div>
          <p className={`${section.heading} h-screen flex items-center justify-center text-2xl lg:text-[40px]`}>{section.text}</p>
        </React.Fragment>
      ))}
    </div>
  );
};

export default StoryPara;
