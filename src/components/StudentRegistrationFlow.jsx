import React, { useState } from "react";
import axios from "axios";

function StudentRegistrationFlow() {
    const [step, setStep] = useState(1);
    const [studentData, setStudentData] = useState({
        student_id: "",
        student_name: "",
        email: "",
        password: ""
    });
    
    const [academicData, setAcademicData] = useState({
        gpa: "",
        credits_completed: "",
        programming_concepts_percentage: "",
        algorithms_concepts_percentage: "",
        software_engineering_percentage: "",
        computer_network_percentage: "",
        electronic_subjects_percentage: "",
        computer_architecture_percentage: "",
        mathematics_percentage: "",
        communication_skills_percentage: "",
        operating_systems_percentage: ""
    });

    // Handle student form changes
    const handleStudentChange = (e) => {
        const { name, value } = e.target;
        setStudentData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle academic form changes
    const handleAcademicChange = (e) => {
        const { name, value } = e.target;
        setAcademicData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle student form submission
    const handleStudentSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/add-student", studentData);
            alert("Student added successfully! Please add academic performance.");
            setStep(2);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Failed to add student.");
        }
    };

    // Handle academic performance submission
    const handleAcademicSubmit = async (e) => {
        e.preventDefault();
        try {
            const academicPayload = {
                ...academicData,
                student_id: studentData.student_id
            };
            
            const response = await axios.post("http://localhost:5001/add-academic-performance", academicPayload);
            alert("Academic performance added successfully!");
            
            // Reset all forms and go back to step 1
            setStudentData({
                student_id: "",
                student_name: "",
                email: "",
                password: ""
            });
            setAcademicData({
                gpa: "",
                credits_completed: "",
                programming_concepts_percentage: "",
                algorithms_concepts_percentage: "",
                software_engineering_percentage: "",
                computer_network_percentage: "",
                electronic_subjects_percentage: "",
                computer_architecture_percentage: "",
                mathematics_percentage: "",
                communication_skills_percentage: "",
                operating_systems_percentage: ""
            });
            setStep(1);
        } catch (error) {
            console.error("Error adding academic performance:", error);
            alert("Failed to add academic performance.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            {/* Progress indicator */}
            <div className="mb-8">
                <div className="flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === 1 ? 'bg-blue-500 text-white' : 'bg-green-500 text-white'
                    }`}>
                        1
                    </div>
                    <div className="h-1 w-16 bg-gray-300">
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step === 2 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600'
                    }`}>
                        2
                    </div>
                </div>
                <div className="flex justify-center mt-2">
                    <span className="mx-4">Student Details</span>
                    <span className="mx-4">Academic Performance</span>
                </div>
            </div>

            {step === 1 ? (
                // Student Registration Form
                <form onSubmit={handleStudentSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Student Registration</h2>
                    
                    <div>
                        <label className="block mb-2">
                            Student ID:
                            <input
                                type="number"
                                name="student_id"
                                value={studentData.student_id}
                                onChange={handleStudentChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2">
                            Student Name:
                            <input
                                type="text"
                                name="student_name"
                                value={studentData.student_name}
                                onChange={handleStudentChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={studentData.email}
                                onChange={handleStudentChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-2">
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={studentData.password}
                                onChange={handleStudentChange}
                                required
                                className="w-full p-2 border rounded"
                            />
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Next: Add Academic Performance
                    </button>
                </form>
            ) : (
                // Academic Performance Form
                <form onSubmit={handleAcademicSubmit} className="space-y-4">
                    <h2 className="text-2xl font-bold mb-4">Academic Performance for {studentData.student_name}</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">
                                GPA:
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="4.0"
                                    name="gpa"
                                    value={academicData.gpa}
                                    onChange={handleAcademicChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block mb-2">
                                Credits Completed:
                                <input
                                    type="number"
                                    name="credits_completed"
                                    value={academicData.credits_completed}
                                    onChange={handleAcademicChange}
                                    required
                                    className="w-full p-2 border rounded"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[
                            ["Programming Concepts", "programming_concepts_percentage"],
                            ["Algorithms Concepts", "algorithms_concepts_percentage"],
                            ["Software Engineering", "software_engineering_percentage"],
                            ["Computer Network", "computer_network_percentage"],
                            ["Electronic Subjects", "electronic_subjects_percentage"],
                            ["Computer Architecture", "computer_architecture_percentage"],
                            ["Mathematics", "mathematics_percentage"],
                            ["Communication Skills", "communication_skills_percentage"],
                            ["Operating Systems", "operating_systems_percentage"]
                        ].map(([label, name]) => (
                            <div key={name}>
                                <label className="block mb-2">
                                    {label} Percentage:
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        name={name}
                                        value={academicData[name]}
                                        onChange={handleAcademicChange}
                                        required
                                        className="w-full p-2 border rounded"
                                    />
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="w-1/2 py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                            Back to Student Details
                        </button>
                        <button
                            type="submit"
                            className="w-1/2 py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Submit Academic Performance
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}

export default StudentRegistrationFlow;