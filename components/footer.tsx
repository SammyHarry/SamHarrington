import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-neutral-800 py-6 text-sm">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <p className="text-neutral-400">© {new Date().getFullYear()} Sam Harrington · Last updated {new Date().toLocaleDateString('en-US')}</p>
        <div className="flex gap-4">
          <Link href="https://www.linkedin.com/in/s-harrington011" aria-label="LinkedIn profile" className="hover:text-accent">LinkedIn</Link>
          <Link href="https://github.com/SammyHarry" aria-label="GitHub profile" className="hover:text-accent">GitHub</Link>
          <Link href="mailto:sharrington329@gmail.com" aria-label="Send email" className="hover:text-accent">Email</Link>
          <Link href="mailto:seharrington@wm.edu" aria-label="Send W&M email" className="hover:text-accent">W&M Email</Link>
        </div>
      </div>
    </footer>
  );
}
