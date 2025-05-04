
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Link from 'next/link';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      router.asPath
    );
  }, [router.asPath]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4">Oops! Page not found</p>
        <Link href="/" className="text-primary hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
