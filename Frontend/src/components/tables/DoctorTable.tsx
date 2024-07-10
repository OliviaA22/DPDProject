import React, { useState, useEffect } from "react";
import { Doctor } from "../Types";

interface DoctorTableProps {
  doctors: Doctor[];
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
  filterLanguage?: string;
}

const DoctorTable: React.FC<DoctorTableProps> = ({
  doctors,
  onEdit,
  onDelete,
  filterLanguage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>(doctors);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const searchLower = searchTerm.toLowerCase();
      const fullName =
        `${doctor.title} ${doctor.first_name} ${doctor.last_name}`.toLowerCase();
      const specialization =
        doctor.specialization?.area_of_specialization.toLowerCase() || "";
      const languages =
        doctor.languages
          ?.map((lang) => lang.language_name.toLowerCase())
          .join(" ") || "";

      console.log("From List", doctor);

      const matchesSearch =
        fullName.includes(searchLower) ||
        specialization.includes(searchLower) ||
        languages.includes(searchLower);

      const matchesFilterLanguage =
        !filterLanguage ||
        doctor.languages?.some(
          (lang) =>
            lang.language_name.toLowerCase() === filterLanguage.toLowerCase()
        );

      return matchesSearch && matchesFilterLanguage;
    });

    setFilteredDoctors(filtered);
  }, [doctors, searchTerm, filterLanguage]);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name, specialization, or language"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-Full p-2 border border-gray-300 rounded-lg"
        />
      </div>
      {/* {filterLanguage && (
        <div className="mb-4">
          <p>Filtered by language: {filterLanguage}</p>
          <button
            onClick={() =>
              window.history.pushState({}, "", window.location.pathname)
            }
            className="px-2 py-1 bg-gray-200 rounded"
          >
            Clear filter
          </button>
        </div>
      )} */}
      <table className="w-full">
        <thead>
          <tr className="font-medium">
            <th className="text-left w-[21%]">Doctor</th>
            <th className="text-left w-[21%]">Specialization</th>
            <th className="text-left w-[14%]">Languages</th>
            <th className="text-left w-[26%]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredDoctors.map((doctor, index) => (
            <tr
              key={doctor.userId || index}
              className="border-b border-blue-200"
            >
              <td>
                {`${doctor.title} ${doctor.first_name || ""} ${
                  doctor.last_name || ""
                }`}
              </td>
              <td>
                {doctor.specialization
                  ? doctor.specialization.area_of_specialization
                  : ""}
              </td>
              <td>
                {doctor.languages
                  ? doctor.languages
                      .map((lang) => lang.language_name)
                      .join(", ")
                  : ""}
              </td>
              <td>
                <button
                  onClick={() => onEdit(doctor)}
                  className="mr-2 px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(doctor)}
                  className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorTable;
