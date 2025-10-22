import React from "react";
import Photo from "../assets/biraj.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 p-6 flex flex-col items-center">
      <h1 className="text-5xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        About Our Company
      </h1>

      <div className="max-w-5xl bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row items-center gap-10 transition-transform transform hover:scale-105">
        
        <div className="flex flex-col items-center text-center md:text-left md:items-start">
          <img
            src={Photo}
            alt="Biraj Thapa"
            className="w-36 h-36 rounded-full object-cover shadow-xl mb-4 transition-transform transform hover:scale-110"
          />
          <span className="font-bold text-2xl text-gray-800 mb-1">Biraj Thapa</span>
          <span className="text-gray-500 text-sm">Founder & CEO</span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">Job Portal</span>!  
            We are dedicated to connecting talented job seekers with top employers.
            Our mission is to make job search simple, fast, and effective.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            At Job Portal, we strive to provide a platform where employers and job seekers
            can meet effortlessly. We are passionate about improving recruitment
            and career growth through innovative technology and exceptional user experience.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center max-w-2xl text-gray-500">
        <p className="text-lg">
          Join us on our journey to make career opportunities accessible for everyone.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
