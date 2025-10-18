const RoleSelector = ({ value, onChange }) => {
  return (
    <div className="flex justify-between mt-2 gap-4">
      <div
        className={`flex-1 p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center transition-transform duration-200
          ${value === "SEEKER" ? "bg-blue-500 text-white border-blue-500 scale-105" : "bg-white border-gray-300 hover:scale-105"}`}
        onClick={() => onChange("SEEKER")}
      >
        <span className="font-semibold">Job Seeker</span>
      </div>

      <div
        className={`flex-1 p-4 rounded-xl border cursor-pointer flex flex-col items-center justify-center transition-transform duration-200
          ${value === "EMPLOYER" ? "bg-blue-500 text-white border-blue-500 scale-105" : "bg-white border-gray-300 hover:scale-105"}`}
        onClick={() => onChange("EMPLOYER")}
      >
        <span className="font-semibold">Employer</span>
      </div>
    </div>
  );
};

export default RoleSelector;
