import React, { useState, useEffect } from 'react';
import { formatSalary, formatDistance, formatDate, getCurrentTimestamp } from '../utils/formatters';
import { validateEmployeeName, validateSalary, validateGender } from '../utils/validators';
import '../styles/Employees.css';

function Employees() {
  const [employees, setEmployees] = useState(() => JSON.parse(localStorage.getItem('employees') || '[]'));
  const [formData, setFormData] = useState({ name: '', salary: '', gender: '' });
  const [errors, setErrors] = useState({});
  const [editId, setEditId] = useState(null);
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    const interval = setInterval(() => {
      setEmployees(prev => prev.map(emp => ({
        ...emp,
        distance: emp.distance + 80,
        updatedTime: getCurrentTimestamp()
      })));
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  const handleAddEmployee = () => {
    const nameErr = validateEmployeeName(formData.name);
    const salErr = validateSalary(formData.salary);
    const genErr = validateGender(formData.gender);
    
    setErrors({ name: nameErr, salary: salErr, gender: genErr });
    
    if (!nameErr && !salErr && !genErr) {
      setEmployees([...employees, {
        id: Date.now().toString(),
        name: formData.name,
        salary: parseFloat(formData.salary),
        gender: formData.gender,
        distance: 0,
        updatedTime: getCurrentTimestamp()
      }]);
      setFormData({ name: '', salary: '', gender: '' });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this record?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
  };

  const handleCopy = (id) => {
    if (window.confirm('Copy this record?')) {
      const emp = employees.find(e => e.id === id);
      setEmployees([...employees, {
        ...emp,
        id: Date.now().toString(),
        distance: 0,
        updatedTime: getCurrentTimestamp()
      }]);
    }
  };

  const startEdit = (id, field, value) => {
    setEditId(id);
    setEditField(field);
    setEditValue(value.toString());
  };

  const saveEdit = (id) => {
    let error = '';
    if (editField === 'name') error = validateEmployeeName(editValue);
    else if (editField === 'salary') error = validateSalary(editValue);
    else if (editField === 'gender') error = validateGender(editValue);

    if (error) {
      alert(error);
      return;
    }

    setEmployees(employees.map(emp => 
      emp.id === id ? {
        ...emp,
        [editField]: editField === 'salary' ? parseFloat(editValue) : editValue,
        updatedTime: getCurrentTimestamp()
      } : emp
    ));
    setEditId(null);
    setEditField(null);
  };

  return (
    <div className="employees-container">
      <h2>Employee Management</h2>
      
      <div className="add-form">
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className={errors.name ? 'error' : ''} />
        <input type="number" placeholder="Salary" value={formData.salary} onChange={e => setFormData({...formData, salary: e.target.value})} className={errors.salary ? 'error' : ''} />
        <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className={errors.gender ? 'error' : ''}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleAddEmployee}>Add Employee</button>
      </div>

      <div className="table-responsive">
        <table className="emp-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Salary</th>
              <th>Gender</th>
              <th>Distance</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp.id}>
                <td>
                  {editId === emp.id && editField === 'name' ? (
                    <div className="edit-inline">
                      <input value={editValue} onChange={e => setEditValue(e.target.value)} />
                      <button onClick={() => saveEdit(emp.id)}>✓</button>
                      <button onClick={() => setEditId(null)}>✕</button>
                    </div>
                  ) : (
                    <span onClick={() => startEdit(emp.id, 'name', emp.name)}>{emp.name}</span>
                  )}
                </td>
                <td className={parseFloat(emp.salary) > 50000 ? 'high-salary' : ''}>
                  {editId === emp.id && editField === 'salary' ? (
                    <div className="edit-inline">
                      <input type="number" value={editValue} onChange={e => setEditValue(e.target.value)} />
                      <button onClick={() => saveEdit(emp.id)}>✓</button>
                      <button onClick={() => setEditId(null)}>✕</button>
                    </div>
                  ) : (
                    <span onClick={() => startEdit(emp.id, 'salary', emp.salary)}>{formatSalary(emp.salary)}</span>
                  )}
                </td>
                <td>
                  {editId === emp.id && editField === 'gender' ? (
                    <div className="edit-inline">
                      <select value={editValue} onChange={e => setEditValue(e.target.value)}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      <button onClick={() => saveEdit(emp.id)}>✓</button>
                      <button onClick={() => setEditId(null)}>✕</button>
                    </div>
                  ) : (
                    <span onClick={() => startEdit(emp.id, 'gender', emp.gender)}>{emp.gender}</span>
                  )}
                </td>
                <td className={emp.distance > 2000 ? 'alert-distance' : ''}>{formatDistance(emp.distance)}</td>
                <td>{formatDate(emp.updatedTime)}</td>
                <td>
                  <button onClick={() => handleDelete(emp.id)} className="del-btn">Delete</button>
                  <button onClick={() => handleCopy(emp.id)} className="copy-btn">Copy</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Employees;
