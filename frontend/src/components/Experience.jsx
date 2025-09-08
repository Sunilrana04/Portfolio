import React from 'react';
import {
  Briefcase,
  Calendar,
  MapPin,
  ExternalLink,
} from 'lucide-react';

const Experience = () => {
const experiences = [
  {
    company: 'Gonagoor Technologie Solutions Ltd.',
    role: 'Frontend Developer Intern',
    duration: 'Nov 2024 - Dec 2024',
    location: 'Offline',
    type: 'Internship',
    description:
      "Worked as a Frontend Developer Intern, contributing to the design and development of responsive and interactive UI components using React and Tailwind CSS. Collaborated closely with backend developers to integrate RESTful APIs, ensuring seamless communication between frontend and backend. Gained hands-on experience in version control, agile workflows, and project planning, enhancing my practical skills in modern web development and teamwork.",
    link: 'https://gonagoor.com',
  },
];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Internship':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Part-time':
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
      case 'Freelance':
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    }
  };

  return (
   <section
  id="experience"
  className="py-20 min-h-screen flex items-center justify-center
             bg-gradient-to-br from-blue-50 to-indigo-50
             dark:from-blue-900/40 dark:to-indigo-900/40"
>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-12">
          Experience
        </h2>
<div className="space-y-8 max-w-3xl mx-auto">
  {experiences.map((exp, index) => (
    <div
      key={index}
      className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-8 
                 hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
    >
      {/* Role & Type */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
          {exp.role}
        </h3>
        <span
          className={`text-sm font-medium px-3 py-1 rounded-full ${getTypeColor(
            exp.type
          )}`}
        >
          {exp.type}
        </span>
      </div>

      {/* Company, Duration, Location, Link */}
      <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Briefcase size={18} />
          <span className="font-medium">{exp.company}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Calendar size={18} />
          <span>{exp.duration}</span>
        </div>
        <div className="flex items-center space-x-1">
          <MapPin size={18} />
          <span>{exp.location}</span>
        </div>
        {exp.link && (
          <div className="flex items-center space-x-1">
            <ExternalLink size={18} />
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline font-medium"
            >
              Company Site
            </a>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700 dark:text-gray-300 mt-4 leading-relaxed">
        {exp.description
          ? exp.description
          : "Contributed to the development of modern web applications, focusing on responsive UI components, integration with backend APIs, and ensuring optimal performance and maintainability. Gained hands-on experience with agile workflows, version control, and collaborative development, reflecting a strong foundation in software engineering principles and practical problem-solving skills."}
      </p>
    </div>
  ))}
</div>

      </div>
    </section>
  );
};

export default Experience;
