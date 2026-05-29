export const validateName = (name) => {
  if (!name || name.trim() === '') {
    return 'Name is required';
  }
  if (name.trim().length < 3) {
    return 'Name must be at least 3 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name should contain only alphabets and spaces';
  }
  return '';
};

export const validateMobileNumber = (mobile) => {
  if (!mobile || mobile.trim() === '') {
    return 'Mobile number is required';
  }
  if (!/^\d{10}$/.test(mobile)) {
    return 'Mobile number must be exactly 10 digits';
  }
  return '';
};

export const validateSalary = (salary) => {
  if (!salary || salary === '') {
    return 'Salary is required';
  }
  const salaryNum = parseFloat(salary);
  if (isNaN(salaryNum)) {
    return 'Salary must be a valid number';
  }
  if (salaryNum <= 0) {
    return 'Salary must be greater than 0';
  }
  return '';
};

export const validateGender = (gender) => {
  if (!gender || gender.trim() === '') {
    return 'Gender is required';
  }
  if (!['Male', 'Female', 'Other'].includes(gender)) {
    return 'Select a valid gender';
  }
  return '';
};

export const validateEmployeeName = (name) => {
  if (!name || name.trim() === '') {
    return 'Employee name is required';
  }
  if (name.trim().length < 3) {
    return 'Name must be at least 3 characters';
  }
  if (!/^[a-zA-Z\s]+$/.test(name)) {
    return 'Name should contain only alphabets and spaces';
  }
  return '';
};
