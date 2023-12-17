import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="px-4 py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-slate-800">About</h1>
        <p className="mb-4 text-slate-700">
          MERN-AUTH is web application about enhancing user authentication
          experiences. With a focus on the MERN stack, this app aim to provide a
          user-friendly authentication solution.
        </p>
        <p className="mb-4 text-slate-700">
          Join us at MERN-AUTH, where security meets simplicity. Experience a
          modern authentication solution tailored to the evolving needs of web
          applications.
        </p>
      </div>
    </motion.div>
  );
}
