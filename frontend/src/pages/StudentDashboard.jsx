import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User, Mail, BookOpen } from "lucide-react";

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    course: ""
  });

  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    if (res.ok) {
      setProfile(data);
      setFormData({ name: data.name, course: data.course });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/students/me`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

    if (res.ok) {
      fetchProfile();
      setIsEditing(false);
      alert("Profile updated successfully");
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  if (!profile) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button onClick={handleLogout} className="logout-btn">
          <LogOut size={18} /> Logout
        </button>
      </div>

      <div className="profile-card">
        <h2>My Profile</h2>

        {!isEditing ? (
          <div className="profile-info">
            <div className="info-item">
              <User size={20} />
              <div>
                <label>Name</label>
                <p>{profile.name}</p>
              </div>
            </div>

            <div className="info-item">
              <Mail size={20} />
              <div>
                <label>Email</label>
                <p>{profile.email}</p>
              </div>
            </div>

            <div className="info-item">
              <BookOpen size={20} />
              <div>
                <label>Course</label>
                <p>{profile.course}</p>
              </div>
            </div>

            <div className="info-item">
              <div>
                <label>Enrollment Date</label>
                <p>{new Date(profile.enrollmentDate).toLocaleDateString()}</p>
              </div>
            </div>

            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate}>
            <input
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              placeholder="Course"
              value={formData.course}
              onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              required
            />
            <div className="form-buttons">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
