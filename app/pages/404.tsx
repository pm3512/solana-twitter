import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="p-8 text-gray-500 text-center">
      <p>
        404 - Not Found
      </p>
      <Link href={'/'} className="block text-pink-500 hover:underline mt-2">
        Go back home
      </Link>
    </div>
  )
}