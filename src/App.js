import React, { useEffect, useState } from 'react';
import './App.css';
import { EmployeeData } from './EmployeeData';

function App() {
  const [data, setData] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [age, setAge] = useState(0)
  const [id, setId] = useState(0)
  const [update, setUpdate] = useState(false)

  useEffect(() => {
    setData(EmployeeData)
  }, []);

  const validateName = (name) => /^[a-zA-Z\s'-]+$/.test(name); // Only allows alphabets
  const validateAge = (age) => /^[1-9][0-9]*$/.test(age);  // Only allows positive integers

  const handleEdit = (id) => {
    const newData = data.filter(item => item.id === id);
    if (newData !== undefined) {
      setUpdate(true);
      setId(id);
      setFirstName(newData[0].firstName);
      setLastName(newData[0].lastName);
      setAge(newData[0].age);
    }
  }


  const handleDelete = (id) => {
    if (id > 0) {
      if (window.confirm('are you sure to delete this item?')) {
        const newData = data.filter(item => item.id !== id);
        setData(newData)
      }
    }
  }

  const handleSave = (e) => {
    e.preventDefault();
    let error = '';


    if (!validateName(firstName))
      error += 'First name must contain only letters. ';
    if (!validateName(lastName))
      error += 'Last name must contain only letters. ';
    if (!validateAge(age))
      error += 'Age must be a positive number. ';


    if (error === '') {
      const newData = [...data];
      const newObject = {
        id: EmployeeData.length + 1,
        firstName: firstName,
        lastName: lastName,
        age: age,
      }
      newData.push(newObject);
      setData(newData)
    }
    else {
      alert(error)
    }
  }

  const handleUpdate = () => {
    if (!validateName(firstName)) {
      alert('First name must contain only letters.');
      return;
    }
    if (!validateName(lastName)) {
      alert('Last name must contain only letters.');
      return;
    }
    if (!validateAge(age)) {
      alert('Age must be a positive number.');
      return;
    }
    const index = data.map((item) => {
      return item.id
    }).indexOf(id);


    const newData = [...data];
    newData[index].firstName = firstName;
    newData[index].lastName = lastName;
    newData[index].age = age;
    setData(newData);
    handleClear();
  }


  const handleClear = () => {
    setId(0);
    setFirstName('');
    setLastName('');
    setAge('');
    setUpdate(false)

  }

  return (
    <div className="App">
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: "10px", marginBottom: "10px" }}>
        <div>
          <label>FirstName:
            <input type='text' placeholder='Enter the First Name' onChange={(e) => setFirstName(e.target.value)} value={firstName} />
          </label>
        </div>

        <div>
          <label>LastName:
            <input type='text' placeholder='Enter the Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName} />
          </label>
        </div>

        <div>
          <label>Age:
            <input type='text' placeholder='Enter the Age' onChange={(e) => setAge(e.target.value)} value={age} />
          </label>
        </div>
        <div>
          {
            !update ?
              <button className='btn btn-primary' onClick={(e) => handleSave(e)}> Save </button>
              :
              <button className='btn btn-primary' onClick={() => handleUpdate()}> Update </button>
          }
          <button className='btn btn-danger' onClick={() => handleClear()}> Clear </button>
        </div>
      </div>

      <table className='table table-hover'>
        <thead>
          <tr>
            <td>Sr.No</td>
            <td>Id</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Age</td>
            <td>Actions</td>
          </tr>
        </thead>
        <tbody>
          {
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.age}</td>
                  <td>
                    <button className='btn btn-primary' onClick={() => handleEdit(item.id)}>Edit</button>
                    <button className='btn btn-danger' onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              )
            })

          }
        </tbody>
      </table>
    </div>
  );
}


export default App;
