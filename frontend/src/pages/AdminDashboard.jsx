import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, UserPlus, Edit, Trash2 } from "lucide-react";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    userId: "",
    name: "",
    email: "",
    course: ""
  });

  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      setStudents(data);
    }
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      fetchStudents();
      setShowForm(false);
      setFormData({ userId: "", name: "", email: "", course: "" });
      alert("Student added successfully");
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${editingStudent._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      fetchStudents();
      setEditingStudent(null);
      setFormData({ userId: "", name: "", email: "", course: "" });
      alert("Student updated successfully");
    }
  };

  const handleDeleteStudent = async (id) => {
    if (confirm("Are you sure you want to delete this student?")) {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        fetchStudents();
        alert("Student deleted successfully");
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course
    });
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="actions">
        <button onClick={() => setShowForm(!showForm)} className="add-btn">
          <UserPlus size={18} /> Add Student
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h3>Add New Student</h3>
          <form onSubmit={handleAddStudent}>
            <input
              placeholder="User ID"
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              required
            />
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              placeholder="Course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              required
            />
            <div className="form-buttons">
              <button type="submit">Add Student</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {editingStudent && (
        <div className="form-card">
          <h3>Edit Student</h3>
          <form onSubmit={handleUpdateStudent}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              placeholder="Course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              required
            />
            <div className="form-buttons">
              <button type="submit">Update Student</button>
              <button type="button" onClick={() => setEditingStudent(null)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="students-table">
        <h2>All Students</h2>
        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Enrollment Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td>{new Date(student.enrollmentDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(student)} className="edit-btn">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDeleteStudent(student._id)} className="delete-btn">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
