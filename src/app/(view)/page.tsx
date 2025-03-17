export default function Home() {
  return (
    <>
      <header
        className="h-[calc(100dvh-64px)] w-full flex flex-col justify-between items-center bg-[#157B56] !text-background bg-cover bg-no-repeat bg-center"
        style={{ backgroundImage: "url('/bg.webp')" }}
      >
        <div className=""></div>
        <div className="">
          <h3 className="font-semibold text-3xl text-center">Democratizing</h3>
          {/* <h1 className="text-8xl font-bold flex flex-row justify-center items-end !m-0">
            Welcome to <span className="text-green-600 border-b">Farmer</span>{" "}
            <div className="h-full w-auto flex justify-center items-center">
              <TractorIcon className="size-22 text-green-600" />
            </div>
          </h1> */}
          <h1 className="text-9xl font-semibold flex flex-row border-b justify-center items-end !m-0">
            Agriculture
          </h1>
        </div>
        <div className="flex flex-row w-full justify-between items-center divide-x">
          <div className="h-[160px] w-full border-t flex flex-col justify-center items-center">
            <div className="text-4xl">BDT 2.45B</div>
            <div className="text-lg">Finance Facilitated</div>
          </div>
          <div className="h-[160px] w-full border-t flex flex-col justify-center items-center">
            <div className="text-4xl">113839+</div>
            <div className="text-lg">Registered Farmers</div>
          </div>
          <div className="h-[160px] w-full border-t flex flex-col justify-center items-center">
            <div className="text-4xl">14000+</div>
            <div className="text-lg">Registered Retailers</div>
          </div>
          <div className="h-[160px] w-full border-t flex flex-col justify-center items-center">
            <div className="text-4xl">299K Ton</div>
            <div className="text-lg">Farm Produce Sold</div>
          </div>
        </div>
      </header>
      <main className="">
        <div className="min-h-[120dvh] !px-[5%] !py-[100px] bg-[#157B56] !mx-auto grid grid-cols-2">
          <div className="h-full">
            <div className="sticky top-[100px] left-0 text-background">
              <h2 className="font-semibold text-8xl">Who we are</h2>
              <p className="text-lg w-2/3 break-words tracking-wide leading-9">
                Farmer is a technology company that enables small-scale farmers
                and Agri Businesses to maximize their profit.
              </p>
            </div>
          </div>

          <div className="w-full h-full text-background">
            {whoweare.map((item, i) => (
              <div key={i} className="border-t !pt-8">
                <h4 className="text-5xl !mb-8">{item.title}</h4>
                <p className="text-lg !mb-8 w-2/3">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* <div className="!py-[64px] !px-[5%]">
          <h2 className="!px-8 text-xl border-b">Our Partners</h2>
        </div> */}
        <div className="!py-[64px] !px-[5%] !space-y-[100px]">
          {extraSec.map((item, i) => (
            <div key={i} className="w-full grid grid-cols-2 gap-[100px]">
              <div className={i % 2 === 0 ? "order-first" : "order-last"}>
                <h2 className="text-7xl !mb-12">{item.title}</h2>
                <p className="text-xl">{item.para}</p>
              </div>
              <div
                className={
                  i % 2 === 0
                    ? "order-last flex flex-row justify-end"
                    : "order-first"
                }
              >
                <div className="bg-zinc-400 h-[500px] w-[400px]"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="!py-[100px] px-[5%]">
          <div className="flex flex-col justify-start items-center gap-6">
            <div className="h-[200px] w-[200px] rounded-full bg-orange-500"></div>
            <h2 className="text-orange-500 text-3xl font-semibold">
              We are Orange Seal certified!
            </h2>
            <p className="w-4/5 text-lg !mx-auto text-center text-balance">
              An integral part of the Orange Movement inspired by the UN SDG-5,
              the Orange Seal recognizes organizations that show significant
              promise and dedication to advancing a gender-equal world. The Seal
              signifies that iFarmer has substantially developed gender
              inclusion practices across their value chain and workforce.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

const whoweare = [
  {
    title: "Farmer",
    desc: "We bundle everything a farmer needs to maximize profit: financing, farm inputs and advisory, insurance, and access to market.",
  },
  {
    title: "Funders",
    desc: "We use technology and data to enable institutions and individuals to support in creating access to finance for the farmers",
  },
  {
    title: "Agriculture Companies",
    desc: "We work with agricultural input companies and service providers, offering quality agriculture input and advisory services to the farmers",
  },
  {
    title: "Buyers",
    desc: "We source directly from the farmers and supply agriculture produce in bulk quantity to large enterprises, modern trade retailers and wholesale markets.",
  },
];

const extraSec = [
  {
    img: "",
    title: "Creating Access to Finance for Farmers",
    para: "We enable individuals and institutions to fund the capital requirement of the farmers. iFarmer bundles finance with agriculture inputs, advisory services, insurance and market access for the farmers. We use an agriculturally relevant and data-driven model to assess risk and return to develop funding schemes that fit the needs of smallholder farmers and the farm funders.",
  },
  {
    img: "",
    title: "Creating Access to Quality Input",
    para: "We empower Agri input retailers by offering a one stop solution for all Agri input supply, offering omni channel presence, doorstep delivery and buy now pay later solutions. This enables the farmers to get access to quality input from their local Agri input shops.",
  },
  {
    img: "",
    title: "Improving Access to Market for the Farmers",
    para: "We use our tech-enabled supply chain network to aggregate fresh produce, directly from farming communities. Thus offering farmers, quality driven competitive prices factoring in all associated costs and expenses, simple payment terms and logistics support. We work with wholesalers, modern trade retailers, exporters and processors to give them access to quality farm produce at a competitive price without having to deal with multiple intermediaries.",
  },
];
