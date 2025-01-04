import React, { useState, useEffect } from 'react';
import axios from 'axios';


const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    regno: "",
    firstname: "",
    lastname: "",
    grade: "",
    attendance: 100
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // Adjust this to match your backend URL

  // Fetch all students
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      if (response.data.success) {
        setStudents(response.data.data);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);
  console.log(students);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (isEditing) {
        const response = await axios.put(`${API_BASE_URL}/api/users/${editId}`, formData);
        if (response.data.success) {
          const updatedStudents = students.map(student => 
            student._id === editId ? response.data.data : student
          );
          setStudents(updatedStudents);
          setIsEditing(false);
          setEditId(null);
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/users`, formData);
        console.log(response)
        if (response.data.success) {
          setStudents([...students, response.data.data]);
        }
      }
      setFormData({
        regno: "",
        firstname: "",
        lastname: "",
        grade: "",
        attendance: 100
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error saving student');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (student) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users/${student._id}`);
      if (response.data.success) {
        setIsEditing(true);
        setEditId(student._id);
        setFormData({
          regno: response.data.data.regno,
          firstname: response.data.data.firstname,
          lastname: response.data.data.lastname,
          grade: response.data.data.grade,
          attendance: response.data.data.attendance
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching student details');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        const response = await axios.delete(`${API_BASE_URL}/api/users/${id}`);
        if (response.data.success) {
          setStudents(students.filter(student => student._id !== id));
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Error deleting student');
      }
    }
  };

  const filteredStudents = students.filter(student =>
    student.firstname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.regno.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && !students.length) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Student Management System</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
            {error}
            <button 
              onClick={() => setError(null)}
              className="float-right font-bold"
            >
              ×
            </button>
          </div>
        )}

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search students..."
            className="p-2 w-full border rounded-lg"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Add/Edit Student Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            name="regno"
            placeholder="Registration No."
            value={formData.regno}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="text"
            name="grade"
            placeholder="Grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            name="attendance"
            placeholder="Attendance %"
            value={formData.attendance}
            onChange={handleInputChange}
            className="p-2 border rounded"
            required
            min="0"
            max="100"
          />
          <button
            type="submit"
            disabled={loading}
            className="col-span-1 md:col-span-2 lg:col-span-5 bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? 'Processing...' : (isEditing ? 'Update Student' : 'Add Student')}
          </button>
        </form>

        {/* Students Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Reg. No</th>
                <th className="p-3 text-left">First Name</th>
                <th className="p-3 text-left">Last Name</th>
                <th className="p-3 text-left">Grade</th>
                <th className="p-3 text-left">Attendance</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{student.regno}</td>
                  <td className="p-3">{student.firstname}</td>
                  <td className="p-3">{student.lastname}</td>
                  <td className="p-3">{student.grade}</td>
                  <td className="p-3">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${student.attendance}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{student.attendance}%</span>
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="px-3 py-1 text-blue-600 hover:bg-blue-100 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(student._id)}
                        className="px-3 py-1 text-red-600 hover:bg-red-100 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;