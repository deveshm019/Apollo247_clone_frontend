import Link from 'next/link';

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/specialties/general-physician-internal-medicine',
      permanent: false,
    },
  };
}

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 text-center">
      <h1 className="text-2xl font-bold text-gray-800">Redirecting you to doctor listings...</h1>
      <p className="mt-4 text-gray-600">
        If you are not redirected automatically, click here:
      </p>
      <Link href="/specialties/general-physician-internal-medicine" className="mt-2 text-blue-600 underline">
        Go to General Physician Page
      </Link>
    </main>
  );
}
