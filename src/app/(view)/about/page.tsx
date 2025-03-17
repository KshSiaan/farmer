import {
  ChartScatterIcon,
  GrabIcon,
  HandshakeIcon,
  RouteIcon,
  ThumbsUpIcon,
  UserRoundSearchIcon,
} from "lucide-react";
import React from "react";

const coreVals = [
  {
    icon: HandshakeIcon,
    title: "Trust and Integrity",
    desc: "We want to build an environment in which mutual trust can develop and that allows us to discuss matters openly. It gives us the confidence to admit when we are wrong and the courage to change. Integrity means that we are truthful and honest. When faced with difficult decisions and hard choices, we do the right thing, even in the face of adversity.",
  },
  {
    icon: RouteIcon,
    title: "Judgment",
    desc: "We want people to use their best judgment. It is the ability to combine personal qualities with relevant knowledge and experience to form opinions and make quick decisions. We admire people who can make wise decisions despite ambiguity and can identify root causes, and not just emphasize on treating symptoms. While intuition is relevant, intuition validated by data is powerful.",
  },
  {
    icon: UserRoundSearchIcon,
    title: "Curiousness",
    desc: "We see change as an opportunity to improve. We frequently push ourselves out of our comfort zone. Our learning mindset ensures we reflect and learn from our successes and failures. We want to think that it is always “day 1” and do not get complacent. Want to learn and unlearn rapidly and eagerly and when required to operate outside of our comfort zone.",
  },
  {
    icon: GrabIcon,
    title: "Courage",
    desc: "We have the courage to think big and make it happen. We create and communicate bold direction and think big to serve our customers and inspire results. Thinking big is often about taking risks and failing and we need all the courage to do so. We want people to say what they think, when it’s in the best interest of iFarmer, even if it is uncomfortable. We believe it takes courage to be vulnerable, in search of truth.",
  },
  {
    icon: ChartScatterIcon,
    title: "Impact and Inclusiveness",
    desc: "We believe that we are on the face of the Earth to create impact that will change the world not for just a few but for many no matter what their background, gender, religion be. We admire people who see the world as it is and have the audacity to imagine the world as it could be. No level of individual excellence justifies undermining people. We believe in those who can elevate others.",
  },
  {
    icon: ThumbsUpIcon,
    title: "Getting Things Done",
    desc: "We focus on the key outputs for our business and deliver them with the right quality and in a timely fashion. Despite setbacks, we rise to the occasion and deliver what is expected from us. We want to focus on results over process and create new ideas that prove useful. If necessary, we challenge prevailing assumptions, and suggest better approaches.",
  },
];

export default function Page() {
  return (
    <>
      <header className="h-[60dvh] w-full bg-zinc-600 text-background !px-[20%] text-center flex flex-col justify-center gap-6">
        <h2 className="text-6xl">About Us</h2>
        <p className="text-lg tracking-wide">
          We are a diverse, ambitious team excited about what we do. We aim to
          build a culture, focusing on people over process. We believe in a
          Dream Team where great and good people can work together to bring
          about a revolutionary change that benefits mankind.
        </p>
      </header>
      <main className="!py-12 !px-12">
        <h1 className="text-3xl font-semibold text-center !mb-12">
          Our Culture and Values
        </h1>
        <div className="w-full grid grid-cols-3 !gap-12">
          {coreVals.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-between items-center !space-y-6"
            >
              <div className="">
                <item.icon className="size-16 text-green-500" />
              </div>
              <h4 className="text-2xl font-semibold">{item.title}</h4>
              <div className="text-zinc-600">{item.desc}</div>
            </div>
          ))}
        </div>
        <div className="w-full h-[300px] bg-green-100 !mt-[100px] flex flex-col justify-center items-center !gap-6">
          <h2 className="text-4xl font-semibold">Join Our Team</h2>
          <p className="text-xl">
            Be a part of an organisation of brilliant thinkers who work towards
            something new, every day.
          </p>
        </div>
      </main>
    </>
  );
}
