import Searchbar from "./components/Searchbar";

export default function Home() {
  return (
    <main className="homepage grid">
      <div className="p-10 bg-black bg-opacity-30 m-auto rounded-xl">
        <h1 className="text-center my-4 text-gray-200">
          Select Your region and type in Your name below <br />
          to check details of your recent matches
        </h1>
        <Searchbar />
      </div>
    </main>
  );
}
