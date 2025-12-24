import React, { useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import excelAnalysis from "../assets/excel-analysis.png";
import expenseTracker from "../assets/expense-tracker.png";
import geminiClone from "../assets/gemini-clone.png";
import diabeticPrediction from "../assets/diabetic-prediction.png";
import heartIQ from "../assets/frontPage.png" 

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const projects = [
    {
      id: 1,
      title: "Heart_IQ",
      description:
        "AI-powered heart disease prediction platform using MERN stack and scikit-learn, delivering real-time predictions with 82% model accuracy. Includes interactive dashboards, JWT authentication, and optimized data pipelines using Pandas and NumPy.",
      image: heartIQ,
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Python", "scikit-learn", "Pandas", "NumPy"],
      category: "Full Stack",
      date: "Nov 2025",
      github: "https://github.com/Sunilrana04/Heart_IQ-Application",
      live: "#", // replace with live link if available
      featured: true,
    },
    {
      id: 2,
      title: "Excel Analysis Platform",
      description:
        "MERN full-stack + Machine learning (ML) application for uploading Excel files and generating insights, charts, and analytics. Includes JWT authentication and email-based password reset functionality.",
      image: excelAnalysis,
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Express", "Machine learning"],
      category: "Full Stack",
      date: "August 2025",
      github: "https://github.com/Sunilrana04/Excel-Analysis",
      live: "https://excel-analysis-frontend.vercel.app/",
      featured: true,
    },
    {
      id: 3,
      title: "Expense Tracker Application",
      description:
        "Full-stack expense tracker solution with React, Node.js, and MongoDB. Features include user authentication, manage expense through own input data, and User dashboard.",
      image: expenseTracker,
      technologies: ["React", "Node.js", "MongoDB", "JWT", "Express"],
      category: "Full Stack",
      date: "January 2025",
      github: "https://github.com/Sunilrana04/Expense-Tracker-Application",
      live: "https://expense-tracker-tan-theta.vercel.app/",
      featured: true,
    },
    {
      id: 4,
      title: "Gemini Dashboard",
      description:
        "Frontend-only React dashboard clone with Tailwind CSS. Features include collaborative AI chat",
      image: geminiClone,
      technologies: ["React", "JavaScript", "Tailwind CSS"],
      category: "Frontend",
      date: "Nov 2024",
      github: "https://github.com/Sunilrana04/Gemini-clone",
      live: "https://gemini-clone-wf5d.vercel.app/",
      featured: true,
    },
    {
      id: 5,
      title: "Diabetic Prediction System",
      description:
        "Machine Learning-based diabetic prediction system using algorithms like Logistic Regression, Linear Regression, and Reinforcement Learning to predict risk levels based on patient data.",
      image: diabeticPrediction,
      technologies: ["Python", "scikit-learn", "Pandas", "NumPy", "Matplotlib", "Linear regression", "Logistic regression"],
      category: "Machine learning",
      date: "Dec 2024",
      github: "https://github.com/Sunilrana04/Diabetic-Prediction-ML",
      live: "https://colab.research.google.com/drive/1L5lYhFUxK21DpINAUGgd-8BcxL5kipEI",
      featured: false,
    },
  ];

  const categories = ["All", "Full Stack", "Frontend", "Machine learning"];

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Projects
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 mb-6"></div>
          <p className="text-gray-600 mt-2 text-sm max-w-2xl mx-auto">
            A curated collection of my academic, personal, and collaborative projects showcasing my proficiency in full-stack and frontend development. Each project demonstrates my ability to build responsive, scalable, and user-friendly applications, integrating modern technologies and best practices.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === category
                  ? "bg-blue-600 text-white shadow"
                  : "bg-white border text-gray-700 hover:bg-blue-50"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-square object-cover rounded-t-md"
              />
              <div className="p-4">
                <h3 className="text-md font-semibold text-gray-800 mb-1">
                  {project.title}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-xs"
                  >
                    <Github className="h-3 w-3" />
                    <span>Code</span>
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 text-xs"
                    >
                      <ExternalLink className="h-3 w-3" />
                      <span>Live</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
