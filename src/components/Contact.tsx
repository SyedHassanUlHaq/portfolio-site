'use client';

import { Parallax } from 'react-scroll-parallax';

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative py-24 px-6 bg-[var(--background)] text-[var(--foreground)] font-mono overflow-hidden"
    >
      {/* Parallax glow blobs */}
      <Parallax speed={-8}>
        <div className="absolute -top-24 right-1/3 w-[25rem] h-[25rem] bg-green-500 opacity-10 rounded-full blur-3xl" />
      </Parallax>

      <Parallax speed={10}>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-2xl" />
      </Parallax>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-green-400">📬 Get in Touch</h2>
        <p className="text-gray-300 mb-8 leading-relaxed">
          Want to work together or just say hi? Reach out via email or phone — I’m always up for building cool stuff.
        </p>

        <div className="bg-white/5 border border-white/10 backdrop-blur p-6 rounded-2xl text-left">
          <p className="mb-3"><span className="text-green-400">📧 Email:</span> <a href="mailto:ulhaqhassan1@gmail.com" className="hover:underline">ulhaqhassan1@gmail.com</a></p>
          <p><span className="text-green-400">📱 Phone:</span> <a href="tel:+923183917033" className="hover:underline">+92 318 3917033</a></p>
        </div>
      </div>
    </section>
  );
}
