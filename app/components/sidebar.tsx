import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="flex flex-col items-center md:items-stretch space-y-2 md:space-y-4">
      <Link
        href={"/"}
        className="inline-block rounded-full hover:bg-gray-100 p-3 md:self-start"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 md:h-10 w-8 md:w-10 text-pink-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
      </Link>
      <div className="flex flex-col items-center md:items-stretch space-y-2">
        <Link
          href={"/"}
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
          active-className="font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <div className="text-xl hidden md:block">Home</div>
        </Link>
        <Link
          href={"/topics"}
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
          active-className="font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
            <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
          </svg>
          <div className="text-xl hidden md:block">Topics</div>
        </Link>
        <Link
          href={"/users"}
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
          active-className="font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
          </svg>
          <div className="text-xl hidden md:block">Users</div>
        </Link>
        {/* TODO: Check connected wallet. */}
        <Link
          href={"/profile"}
          className="rounded-full hover:bg-gray-100 p-3 md:w-full inline-flex items-center space-x-4"
          active-className="font-bold"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-700"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clip-rule="evenodd"
            />
          </svg>
          <div className="text-xl hidden md:block">Profile</div>
        </Link>
      </div>
      <div className="fixed bottom-8 right-8 md:static w-48 md:w-full">
        {/* TODO: Connect wallet */}
        <div className="bg-pink-500 text-center w-full text-white rounded-full px-4 py-2">
          Select a wallet
        </div>
      </div>
    </aside>
  );
}
