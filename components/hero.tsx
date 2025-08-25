import { motion } from 'framer-motion';
import Link from 'next/link';
import Stat from './stat';

const chips = ['Data Science', 'Applied Math', 'Finance', 'React Native', 'AI'];

export default function Hero() {
  return (
    <section className="flex flex-col items-center py-24 text-center">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Sam Harrington
      </motion.h1>
      <p className="mb-8 text-lg text-neutral-400">
        Data Science & Applied Math @ William & Mary • Finance + AI • React Native
      </p>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {chips.map((c) => (
            <span key={c} className="rounded-2xl bg-neutral-800 px-3 py-1 text-sm">
              {c}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/Sam_Harrington_Resume.pdf"
          className="rounded-md bg-accent px-4 py-2 text-neutral-900"
        >
          Download Resume
        </Link>
        <Link
          href="mailto:sharrington329@gmail.com"
          className="rounded-md border border-accent px-4 py-2"
        >
          Email Me
        </Link>
        <Link
          href="https://www.linkedin.com/in/s-harrington011"
          className="rounded-md border border-accent px-4 py-2"
        >
          LinkedIn
        </Link>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Stat label="GPA" value="3.97/4.0" />
        <Stat label="WSP Coursework" value="In Progress" />
        <Stat label="Projects" value="2" />
      </div>
    </section>
  );
}
