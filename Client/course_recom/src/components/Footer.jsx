import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* About Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">About Us</h3>
          <p className="text-sm text-gray-200">
            Learn more about how we help students find the best online courses tailored to their needs.
          </p>
          <div className="rounded-lg w-32 h-32 bg-gray-800 mx-auto">
            {/* Placeholder for a 3D Model */}
            <p className="text-xs text-center text-gray-500">3D Model Here</p>
          </div>
        </div>

        {/* Useful Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a
                href="/home"
                className="text-gray-200 hover:text-gray-50 transition"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="text-gray-200 hover:text-gray-50 transition"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-200 hover:text-gray-50 transition"
              >
                Contact
              </a>
            </li>
            <li>
              <a
                href="/faqs"
                className="text-gray-200 hover:text-gray-50 transition"
              >
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div className="space-y-4 text-center">
          <h3 className="text-lg font-bold">Follow Us</h3>
          <div className="flex justify-center space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-white text-2xl transition"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-300 hover:text-white text-2xl transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white text-2xl transition"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <p className="text-xs text-gray-400">
            &copy; 2025 Course Connector. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
