import React from 'react';
import { Code, Database, Globe, Smartphone, Award, Users, Cloud, Zap, Layout } from "lucide-react";
const About = () => {

const highlights = [
  { icon: <Code size={24} />, title: "Full Stack Development", description: "Proficient in React, Node.js, and cloud platforms" },
  { icon: <Database size={24} />, title: "Database Design", description: "Experience with SQL/NoSQL databases, data modeling" },
  { icon: <Globe size={24} />, title: "Web Technologies", description: "Expert in HTML5, CSS3, JavaScript, and frameworks" },
  { icon: <Smartphone size={24} />, title: "Machine learning", description: "Developing predictive models, analyzing data, and implementing AI solutions" },
  { icon: <Award size={24} />, title: "Academic Excellence", description: "Maintaining high GPA while participating in coding competitions" },
  { icon: <Users size={24} />, title: "Team Collaboration", description: "Strong communication skills, agile teamwork" },
];


  return (
    <section
      id="about"
      className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A dedicated MCA student with a passion for technology and innovation
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left Column - Text */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                I'm currently pursuing my Master of Computer Applications (MCA) with a focus on
                modern software development practices. My journey in technology began with a
                curiosity about how things work, which has evolved into a passion for creating
                innovative solutions.
              </p>
              <p className="text-gray-700 leading-relaxed">
                With hands-on experience in full-stack development, I enjoy working on projects that
                challenge me to learn new technologies and solve complex problems. I'm particularly
                interested in web development, cloud computing, and emerging technologies like AI
                and machine learning.
              </p>
              <p className="text-gray-700 leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects,
                participating in hackathons, or exploring the latest tech trends. I believe in
                continuous learning and staying updated with industry best practices.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {[
                { value: '3+', label: 'Projects' },
                { value: '3+', label: 'Years Learning' },
                { value: '8.9', label: 'CGPA' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center bg-white border border-gray-200 rounded-lg py-4 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Highlights */}
          <div className="grid sm:grid-cols-2 gap-5">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 p-5 rounded-lg hover:shadow-md transition-all"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{highlight.icon}</div>
                  <h3 className="font-semibold text-gray-800">
                    {highlight.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">
                  {highlight.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
