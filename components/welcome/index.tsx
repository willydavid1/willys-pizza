import Link from "next/link";

const Welcome = () => {
  return (
    <div className="firefox:bg-opacity-80 backdrop-filter backdrop-blur-lg bg-opacity-20 bg-white flex flex-col p-10 rounded-lg shadow-lg hover:shadow-xl transition-all items-center justify-center">
      <h1 className="text-2xl capitalize mb-3 text-center text-yellow-400 font-extrabold">
        welcome to willy&apos;s pizza
      </h1>

      <Link href="/order">
        <a className="text-gray-50 mb-3 text-lg bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2 px-10">
          Order Pizza
        </a>
      </Link>

      <Link href="/dashboard">
        <a className="text-gray-50 text-lg bg-yellow-400 hover:bg-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 rounded-lg py-2 px-10">
          Dashboard - Admin only
        </a>
      </Link>
    </div>
  );
};

export default Welcome;
