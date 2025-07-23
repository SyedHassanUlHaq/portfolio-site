'use client';

import { Parallax } from 'react-scroll-parallax';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-gradient-to-t from-black to-purple-950 text-white overflow-hidden"
    >
      {/* Parallax glow blobs */}
      <Parallax speed={-8}>
        <div className="absolute -top-24 right-1/3 w-[25rem] h-[25rem] bg-pink-600 opacity-20 rounded-full blur-3xl" />
      </Parallax>

      <Parallax speed={10}>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700 opacity-10 rounded-full blur-2xl" />
      </Parallax>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">📬 Get in Touch</h2>
        <p className="text-gray-300 mb-10">
          Want to work together or just say hi? Drop me a message — I&apos;m always open to new ideas and collabs.
        </p>

        <form
          action="mailto:ulhaqhassan1@gmail.com"
          method="POST"
          encType="text/plain"
          className="flex flex-col gap-4 backdrop-blur bg-white/5 p-6 rounded-2xl border border-white/10"
        >
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="px-4 py-3 bg-black/20 rounded-lg border border-white/10 placeholder-gray-400 text-white focus:outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            className="px-4 py-3 bg-black/20 rounded-lg border border-white/10 placeholder-gray-400 text-white focus:outline-none"
            required
          />
          <textarea
            name="message"
            placeholder="Your message"
            rows={4}
            className="px-4 py-3 bg-black/20 rounded-lg border border-white/10 placeholder-gray-400 text-white focus:outline-none"
            required
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
