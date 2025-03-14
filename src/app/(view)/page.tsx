import { TractorIcon } from "lucide-react";

export default function Home() {
  return (
    <>
      <header className="h-[calc(100dvh-64px)] w-full flex flex-col justify-center items-center">
        <div className="">
          <h1 className="text-8xl font-bold flex flex-row justify-center items-end !m-0">
            Welcome to <span className="text-green-600 border-b">Farmer</span>{" "}
            <div className="h-full w-auto flex justify-center items-center">
              <TractorIcon className="size-22 text-green-600" />
            </div>
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
