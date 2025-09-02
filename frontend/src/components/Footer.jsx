import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/johnsmith', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/johnsmith', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:john.smith@example.com', label: 'Email' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">SR</span>
              </div>
              <h3 className="text-xl font-bold tracking-wide">Sunil Rana</h3>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Machine Learning <span className="text-blue-400 font-medium">Full Stack Developer</span>, 
              Focused on building intelligent, data-driven, and impactful web applications. 
  Always curious, eager to learn, and excited to advance my professional journey.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 hover:bg-blue-600 rounded-lg transition-colors duration-200"
                    title={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-blue-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-purple-400 mb-4">Get In Touch</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <p>📧 sunilrana0415@gmail.com</p>
              <p>📱 +91 7667947823</p>
              <p>📍 Bangalore, India</p>
              <p className="text-xs mt-4 italic text-gray-500">
                Open to learning, collaborations, and exciting opportunities 🚀
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 text-gray-400 mb-4 md:mb-0 text-sm">
              <span>© {currentYear} Sunil Rana · Built with passion</span>
              <Heart className="h-4 w-4 text-red-500" />
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-sm transition-all duration-200 transform hover:scale-105"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
