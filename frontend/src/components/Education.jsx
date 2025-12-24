import React from "react";
import { GraduationCap, Calendar, MapPin, Award, BookOpen, Trophy } from "lucide-react";

const Education = () => {
  const education = [
    {
      degree: "Master of Computer Applications (MCA)",
      institution: "Dayananda Sagar College of engineering , Banglore",
      location: "Bangalore, India",
      duration: "2023 - 2025",
      cgpa: "9.00/10",
      status: "Completed",
      description:
        "Specializing in Software Engineering and Web Technologies. Coursework includes Data Structures, DBMS, Software Engineering, and Machine Learning.",
      achievements: ["Dean's List for Academic Excellence", "Best Project Award", "Active member of Coding Club"],
      courses: ["Data Structures", "Database Systems", "Software Engineering", "Web Technologies", "Machine Learning"],
    },
    {
      degree: "Bachelor of Science in Information Technology",
      institution: "Doranda College, Ranchi",
      location: "Ranchi, India",
      duration: "2019 - 2022",
      cgpa: "8.66/10",
      status: "Completed",
      description: "Strong foundation in programming languages, computer science fundamentals, and software development.",
      achievements: ["Graduated with First Class Honors", "Winner of Programming Contest", "President of CS Society"],
      courses: ["C/C++", "Java", "Data Structures", "Database Systems", "Web Development"],
    },
    {
      degree: "Higher Secondary Certificate (12th)",
      institution: "+2 S R S S R High School, Giridih, Jharkhand",
      location: "Jharkhand, India",
      duration: "2018 - 2019",
      Percentage: "72%",
      status: "Completed",
      description: "Science stream with Mathematics, Physics, Chemistry, and Computer Science.",
      achievements: ["Running Champion in Class", "Captain of Quiz Team"],
      courses: ["Mathematics", "Physics", "Chemistry", "Computer Science"],
    },
  ];

  const certifications = [
    { title: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services", date: "Nov 2024", credentialId: "AWS-CCP-2024-001" },
    { title: "MongoDB Developer Associate", issuer: "MongoDB University", date: "Oct 2024", credentialId: "MDB-DEV-2024-002" },
    { title: "Meta Frontend Developer", issuer: "Meta (Coursera)", date: "Sep 2024", credentialId: "META-FE-2024-003" },
    { title: "Google Analytics Certified", issuer: "", date: "Aug 2024", credentialId: "GA-CERT-2024-004" },
  ];

  return (
    <section id="education" className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Education & Certifications</h2>
          <p className="text-gray-600 text-sm">My academic journey and professional certifications</p>
        </div>

        {/* Education Timeline */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Academic Background</h3>
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 p-6"
              >
                {/* Timeline connector */}
                {index < education.length - 1 && (
                  <div className="absolute left-8 -bottom-6 w-0.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-500"></div>
                )}

                <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
                  {/* Left Column */}
                  <div className="flex-1 mb-6 lg:mb-0">
                    <div className="flex items-start space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              edu.status === "Pursuing"
                                ? "bg-green-100 text-green-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {edu.status}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                          <div className="flex items-center space-x-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{edu.institution}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{edu.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{edu.duration}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-4 w-4" />
                            <span>CGPA: {edu.cgpa}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{edu.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="lg:w-1/3 space-y-5">
                    {/* Achievements */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                        <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                        Achievements
                      </h4>
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="text-sm text-gray-600 flex items-start">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2"></span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Key Courses */}
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Key Courses</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.courses.slice(0, 5).map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-100"
                          >
                            {course}
                          </span>
                        ))}
                        {edu.courses.length > 5 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                            +{edu.courses.length - 5} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

     
      </div>
    </section>
  );
};

export default Education;
