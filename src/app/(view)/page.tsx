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
      {/* <main className="!p-4">Hello</main> */}
    </>
  );
}
