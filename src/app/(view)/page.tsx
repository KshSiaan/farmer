export default function Home() {
  return (
    <>
      <header className="h-[calc(100dvh-64px)] w-full flex flex-col justify-center items-center">
        <div className="">
          <h1 className="text-8xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              Farmer
            </span>
          </h1>
          <p className="text-lg text-center !mt-4 text-zinc-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi id
            error repellendus ipsa
          </p>
        </div>
      </header>
      {/* <main className="!p-4">Hello</main> */}
    </>
  );
}
