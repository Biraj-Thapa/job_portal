import React from "react";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Layers,
  Clock,
  Building2,
} from "lucide-react";

const JobCard = ({ job, onApply, onClickCard, forEmployer }) => {
  return (
    <div onClick={() => onClickCard && onClickCard(job.id)} className="relative bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
      {/* Gradient Accent */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl" />

      {/* Job Title & Company */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
        <p className="flex items-center text-gray-600 text-sm gap-1 mt-1">
          <Building2 size={14} className="text-blue-500" /> {job.company}
        </p>
      </div>

      {/* Job Info */}
      <div className="space-y-1 text-sm text-gray-700">
        {job.location && (
          <p className="flex items-center gap-2">
            <MapPin size={15} className="text-blue-400" /> {job.location}
          </p>
        )}
        {job.category && (
          <p className="flex items-center gap-2">
            <Briefcase size={15} className="text-purple-500" /> {job.category}
          </p>
        )}
        {job.salary && (
          <p className="flex items-center gap-2">
            <DollarSign size={15} className="text-green-500" /> ${job.salary}
          </p>
        )}
        {job.jobLevel && (
          <p className="flex items-center gap-2">
            <Layers size={15} className="text-orange-500" /> {job.jobLevel}
          </p>
        )}
        {job.applicationDeadline && (
          <p className="flex items-center gap-2">
            <Clock size={15} className="text-red-500" /> Deadline:{" "}
            {new Date(job.applicationDeadline).toLocaleDateString()}
          </p>
        )}
      </div>

      {/* Description */}
      <p className="mt-3 text-gray-600 text-sm leading-relaxed line-clamp-3">
        {job.description}
      </p>

      {/* Actions */}
      <div className="flex justify-end mt-5">
        {forEmployer ? (
          <button className="px-4 py-2 text-sm rounded-lg font-medium border border-gray-300 hover:bg-gray-100 text-gray-800 transition">
            Manage
          </button>
        ) : (
          <button
          
            onClick={(e) =>{ 
                e.stopPropagation();
                onApply && onApply(job.id)}}
            className="px-5 py-2 text-sm rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md transition"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
