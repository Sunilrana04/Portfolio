import React, { useEffect, useState } from "react";
import AIChat from "./AIChat"; // ✅ Keep chatbot
import Resume from "../assets/SunilRanaResumes.pdf";
import profilePic from "../assets/Passport.jpeg";




const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const fullText = "Full Stack Developer & Machine Learning ";
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const speed = isDeleting ? 80 : 120;
    const typing = setTimeout(() => {
      if (!isDeleting && index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        setIndex(index + 1);
      } else if (isDeleting && index > 0) {
        setTypedText(fullText.slice(0, index - 1));
        setIndex(index - 1);
      } else if (!isDeleting && index === fullText.length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && index === 0) {
        setIsDeleting(false);
      }
    }, speed);

    return () => clearTimeout(typing);
  }, [index, isDeleting, fullText]);

  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ✅ Force Download for Mobile + Desktop
  const handleDownload = async () => {
  try {
    const response = await fetch(Resume);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "SunilRana_Resume.pdf"; // ✅ Force download name
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Resume download failed:", error);
  }
};

  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen pt-24 lg:pt-25 overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      {/* Background elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-indigo-200 rounded-full opacity-20"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20"></div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Profile Image */}
          <div className="mx-auto rounded-full p-1.5 bg-gradient-to-r from-blue-400 to-indigo-500 shadow-md w-1/4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg aspect-square">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <img
                src={profilePic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Name and Title */}
          <div className="space-y-4">
            <h4 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black">
              Sunil Rana
            </h4>
            <p className="text-xl sm:text-2xl font-semibold text-black-600 dark:text-indigo-400 tracking-wide min-h-[30px]">
              <span className="animate-text-glow">{typedText}</span>
              <span className="border-r-2 border-black-600 animate-pulse ml-1"></span>
            </p>
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Bangalore, India</span>
            </div>
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-lg text-gray-600 leading-relaxed">
            Passionate about building innovative web solutions and always eager
            to learn new technologies. As an MCA student, I have been exploring
            the fundamentals of computer science along with hands-on experience
            in Full Stack Development.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* ✅ Updated Resume Button */}
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Download Resume</span>
            </button>

            {/* Learn More */}
            <button
              onClick={scrollToAbout}
              className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-all duration-300"
            >
              <span className="font-medium">Learn More</span>
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-5 pt-4">
            {/* GitHub */}
            <a
              href="https://github.com/Sunilrana04"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 hover:text-white hover:bg-gray-900 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* GitHub Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sunil-rana-240113281/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 text-gray-600 hover:text-white hover:bg-blue-700 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* LinkedIn Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Email */}
            <a
              href="mailto:sunilrana0415@gmail.com"
              className="p-3 text-gray-600 hover:text-white hover:bg-red-500 rounded-full transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* Email Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 12.713l-11.985-9.713h23.97l-11.985 9.713zm0 2.574l-12-9.725v15.438h24v-15.438l-12 9.725z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Chatbot bottom-right */}
      <div className="absolute bottom-6 right-6 z-20 w-60 h-60">
        <AIChat />
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-blue-400"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </section>
  );
};

export default Hero;
