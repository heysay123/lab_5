import React, { useState } from 'react';
import { Button, Table, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Default student data
  const defaultStudents = [
    { id: 1, name: 'Nguyen Van A', code: 'CODE12345', isActive: true },
    { id: 2, name: 'Tran Van B', code: 'CODE67890', isActive: false },
  ];

  const [students, setStudents] = useState(defaultStudents);
  const [selectedCount, setSelectedCount] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    isActive: false,
  });

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Add new student to the list
  const handleAddStudent = () => {
    const newStudent = {
      id: students.length + 1,
      name: formData.name,
      code: formData.code,
      isActive: formData.isActive,
    };
    setStudents([newStudent, ...students]);
    setFormData({ name: '', code: '', isActive: false });
  };

  // Handle student selection
  const handleSelectStudent = (e, id) => {
    const selected = e.target.checked;
    const newSelectedCount = selected
      ? selectedCount + 1
      : selectedCount - 1;
    setSelectedCount(newSelectedCount);
  };

  // Delete a student
  const handleDeleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  // Clear all students
  const handleClear = () => {
    setStudents([]);
    setSelectedCount(0);
  };

  return (
    <div className="container">
      <h2>Total Selected Student: {selectedCount}</h2>
      
      <Form>
        <Form.Group controlId="formStudentName">
          <Form.Label>Student Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formStudentCode">
          <Form.Label>Student Code</Form.Label>
          <Form.Control
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formIsActive">
          <Form.Check
            type="checkbox"
            name="isActive"
            label="Still Active"
            checked={formData.isActive}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleAddStudent}>
          Add
        </Button>
        <Button variant="danger" onClick={handleClear} className="ml-2">
          Clear
        </Button>
      </Form>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Select</th>
            <th>Student Name</th>
            <th>Student Code</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => handleSelectStudent(e, student.id)}
                />
              </td>
              <td>{student.name}</td>
              <td>{student.code}</td>
              <td>
                <span
                  className={`badge ${
                    student.isActive ? 'bg-info' : 'bg-danger'
                  }`}
                >
                  {student.isActive ? 'Active' : 'In-active'}
                </span>
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
