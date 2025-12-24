import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp, MapPin, Phone } from 'lucide-react';

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
    { 
      icon: Github, 
      href: 'https://github.com/Sunilrana04', 
      label: 'GitHub',
      color: 'hover:bg-gray-700'
    },
    { 
      icon: Linkedin, 
      href: 'https://www.linkedin.com/in/sunil-rana-240113281/', 
      label: 'LinkedIn',
      color: 'hover:bg-blue-700'
    },
    { 
      icon: Mail, 
      href: 'mailto:sunilrana0415@gmail.com', 
      label: 'Email',
      color: 'hover:bg-red-600'
    }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255,255,255,0.3) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)`,
          backgroundSize: '100px 100px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <span className="text-white font-bold text-lg">SR</span>
                </div>
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Sunil Rana
                </h3>
                <p className="text-blue-400 font-medium text-sm">Full Stack Developer</p>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-8 max-w-lg text-lg">
              Passionate about building <span className="text-blue-400 font-semibold">intelligent web applications</span> 
              that solve real-world problems. Combining machine learning with modern web technologies 
              to create impactful digital experiences.
            </p>
            
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group p-3 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 ${social.color} transition-all duration-300 transform hover:scale-110 hover:shadow-lg`}
                    title={social.label}
                  >
                    <Icon className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
              Navigation
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="group flex items-center text-gray-300 hover:text-white transition-all duration-200 text-sm hover:translate-x-1"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Let's Connect
            </h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400" />
                </div>
                <a 
                  href="mailto:sunilrana0415@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  sunilrana0415@gmail.com
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition-colors">
                  <Phone className="h-4 w-4 text-green-400" />
                </div>
                <a 
                  href="tel:+917667947823"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +91 7667947823
                </a>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition-colors">
                  <MapPin className="h-4 w-4 text-purple-400" />
                </div>
                <span className="text-gray-300 text-sm">Bangalore, India</span>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <p className="text-xs text-blue-300 text-center">
                  🚀 Open to collaborations & exciting opportunities
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-sm">
              <span>© {currentYear} Sunil Rana</span>
              <span className="text-gray-600">•</span>
              <span>Built with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span className="text-gray-600">•</span>
              <span>Powered by innovation</span>
            </div>

            <button
              onClick={scrollToTop}
              className="group flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <ArrowUp className="h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute bottom-10 left-10 w-4 h-4 bg-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-20 w-6 h-6 bg-purple-500 rounded-full opacity-15 animate-pulse delay-75"></div>
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-cyan-500 rounded-full opacity-25 animate-pulse delay-150"></div>
    </footer>
  );
};

export default Footer;