import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const [attendanceStatus, setAttendanceStatus] = useState(false);
  const [students, setStudents] = useState(() => {
  const storedStudents = localStorage.getItem("students");
  return storedStudents ? JSON.parse(storedStudents) : [];
});


  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);


  const searchedStudents = students.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase().trim())
  );

  function handleStudent(e) {
    e.preventDefault();
    setStudents([...students, { id: crypto.randomUUID(), name ,attendanceStatus: attendanceStatus}]);
    setName("");
  }

  function handleAttendance(id, status) {
    setStudents(students.map((student) => 
      student.id === id ? { ...student, attendanceStatus: status } : student
    ));
  }
  return (
    <div>
      <h1>No. of Students: {students.length}</h1>

      <form onSubmit={handleStudent}>
        <h1>Add Student</h1>
        <input 
          type="text" 
          placeholder="Enter Name..." 
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        <h1>Search Student</h1>
        <input 
          type="text" 
          placeholder="Search Name..." 
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
          <ul>
            {searchedStudents.map((student) => (
              <li key={student.id}>
                {student.name}
                {student.attendanceStatus ? " (Present)" : " (Absent)"}
                <button onClick={() => handleAttendance(student.id, true)}>P</button>
                <button onClick={() => handleAttendance(student.id, false)}>A</button>
                <button onClick={() => setStudents(students.filter((s) => s.id !== student.id))}>Remove</button>
                
              </li>
            ))}
          </ul>
        </div>
    </div>
  )

}

export default App;