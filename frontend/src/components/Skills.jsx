import React from "react";
import { Monitor, Settings, Database, Terminal } from "lucide-react"; // ✅ replaced Tool with Terminal

const Skills = () => {
  const skillCategories = [
    {
      icon: <Monitor size={24} />,
      title: "Frontend Development",
      description:
        "Proficient in React.js, JavaScript (ES6+), HTML5, and CSS3 for building responsive, scalable, and dynamic interfaces. Skilled in Tailwind CSS and modern UI frameworks to create engaging user experiences with a strong focus on mobile-first design. Recognized for writing clean, maintainable code and delivering high-performance applications aligned with industry best practices.",
    },
    {
      icon: <Settings size={24} />,
      title: "Backend Development",
      description:
        "Hands-on experience with Node.js and Express.js for developing RESTful APIs and robust server-side logic. Knowledge of Python and SQL for efficient data handling and management. Skilled at integrating authentication, authorization, and middleware to build secure, scalable, and high-performing applications aligned with modern backend standards.",
    },
    {
      icon: <Database size={24} />,
      title: "Database & Cloud",
      description:
        "Familiar with MongoDB, MySQL, and database schema design for efficient data storage and retrieval. Basic exposure to Docker and cloud deployment practices, ensuring applications are scalable and production-ready.",
    },
    {
      icon: <Terminal size={24} />,
      title: "Tools & Others",
      description:
        "Experience with Git & GitHub for version control and team collaboration. Proficient in using VS Code, Postman, and debugging tools to ensure smooth development. Recognized for being a quick learner, problem solver, and effective communicator.",
    },
  ];

  const certifications = [
    "Full Stack Webdevelopment",
    "Digital Marketing",
    "Code Sprint 2024",
    "Machine Learning",
  ];

  return (
    <section
      id="skills"
      className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            My technical skills and certifications as a fresher
          </p>
        </div>

        {/* Skills Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {skillCategories.map((skill, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 p-6 rounded-lg hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-2xl">{skill.icon}</div>
                <h3 className="font-semibold text-gray-800">{skill.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{skill.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Certifications
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {certifications.map((cert, idx) => (
              <span
                key={idx}
                className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
