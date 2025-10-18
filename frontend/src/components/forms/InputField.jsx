import { Field, ErrorMessage } from "formik";

const InputField = ({ name, type = "text", label, Icon, placeholder }) => {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text font-semibold">{label}</span>
      </label>
      <div className="flex items-center border border-primary rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-400">
        {Icon && <Icon size={20} className="ml-3 text-gray-400" />}
        <Field
          name={name}
          type={type}
          placeholder={placeholder || label}
          className="input input-bordered input-primary w-full border-none rounded-none focus:outline-none"
        />
      </div>
      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};

export default InputField;
