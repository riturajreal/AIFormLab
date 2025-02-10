import React from "react";
import Link from "next/link";

const Hero = () => {
  return (
    <div>
      <section className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
          <div className="mx-auto max-w-xl text-center">
            <h1
              className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
            >
              Create Your Forms

              <span className="sm:block"> With AI </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Build custom forms instantly using AI. Transform your ideas into professional forms with
              natural language - no coding required.
            </p>

            <div className="mt-8 flex flex-wrap justify-center items-center">
              <Link
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-black focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/dashboard"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
