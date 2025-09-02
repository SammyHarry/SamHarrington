import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t dark:border-neutral-800 border-neutral-200 py-6 text-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-neutral-500 dark:text-neutral-400">© {new Date().getFullYear()} Sam Harrington</p>
        <div className="flex gap-4">
          <Link href="https://www.linkedin.com/in/s-harrington011" className="hover:text-accent">LinkedIn</Link>
          <Link href="https://github.com/SammyHarry" className="hover:text-accent">GitHub</Link>
          <Link href="mailto:sharrington329@gmail.com" className="hover:text-accent">Email</Link>
          <Link href="mailto:seharrington@wm.edu" className="hover:text-accent">WM Email</Link>
        </div>
      </div>
    </footer>
  );
}
