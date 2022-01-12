import "./App.css";
import react, { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [education, setEducation] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAge = (event) => {
    setAge(event.target.value);
  };

  const handlePosition = (event) => {
    setPosition(event.target.value);
  };

  const handleWage = (event) => {
    setWage(event.target.value);
  };

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleEducation = (event) => {
    setEducation(event.target.value);
  };

  const addEmployee = (event) => {
    event.preventDefault();
    axios
    .post("https://git.heroku.com/hr-management-app-server.git/create", {
      // .post("http://localhost:8000/create", {
        //second or white or value name,age,position etc refer to value in input
        //yellow or key or first name, age, education connected to req.body.name in server
        name: name,
        age: age,
        position: position,
        country: country,
        education: education,
        wage: wage,
      })
      .then(() => {
        console.log("success");
        // setEmployeeList([
        //   ...employeeList,
        //   {
        //     name: name,
        //     age: age,
        //     position: position,
        //     country: country,
        //     education: education,
        //     wage: wage,
        //   },
        // ]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getEmployees = () => {
    axios
    .get("https://git.heroku.com/hr-management-app-server.git/employees", {})
      // .get("http://localhost:8000/employees", {})
      .then((result) => {
        console.log(result);
        setEmployeeList(result.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateWage = (id) => {
    axios
    .put("https://git.heroku.com/hr-management-app-server.git/update", { wage: newWage, id: id })
      // .put("http://localhost:8000/update", { wage: newWage, id: id })
      .then((result) => {
        setEmployeeList(
          employeeList.map((employee) => {
            return employee.id === id
              ? {
                  id: employee.id,
                  name: employee.name,
                  age: employee.age,
                  position: employee.position,
                  education: employee.education,
                  wage: employee.newWage,
                  country: employee.country
                }
              : employee;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteEmployees=(id)=>{
    axios.delete(`https://git.heroku.com/hr-management-app-server.git/delete/${id}`)
    // axios.delete(`http://localhost:8000/delete/${id}`)
    .then((result) => {
      setEmployeeList(
        employeeList.filter((employee) => {
          return employee.id !== id

        })
      );
    })
    .catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="app">
      <div className="information">
        <label>Name:</label>
        <input
          value={name}
          className="information__input"
          type="text"
          onChange={handleName}
        ></input>
        <label>Age:</label>
        <input
          value={age}
          className="information__input"
          type="number"
          onChange={handleAge}
        ></input>
        <label>Country:</label>
        <input
          value={country}
          className="information__input"
          type="text"
          onChange={handleCountry}
        ></input>
        <label>Position:</label>
        <input
          value={position}
          className="information__input"
          type="text"
          onChange={handlePosition}
        ></input>
        <label>Education:</label>
        <input
          value={education}
          className="information__input"
          type="text"
          onChange={handleEducation}
        ></input>
        <label>Annual Wage ($):</label>
        <input
          value={wage}
          className="information__input"
          type="number"
          onChange={handleWage}
        ></input>
        <button onClick={addEmployee} className="information__button">
          Add Employee
        </button>
        <hr className="line" />
        <div className="employees">
          <button onClick={getEmployees} className="information__button">
            {" "}
            Show Employees
          </button>
        </div>
        <div>
          {employeeList.map((employee, key) => {
            return (
              <div className="employee">
                <p className="employee__label--small">Name: {employee.name}</p>
                <p className="employee__label--small">Age: {employee.age}</p>
                <p className="employee__label">Position: {employee.position}</p>
                <p className="employee__label">
                  Education: {employee.education}
                </p>
                <div>
                  <p className="employee__label--small">
                    Wage: ${employee.wage}
                  </p>
                  <input
                    onChange={(event) => {
                      setNewWage(event.target.value);
                    }}
                    type="text"
                    placeholder="0"
                  ></input>
                  <button
                  className="updateButton"
                    onClick={() => {
                      updateWage(employee.id);
                    }}
                  >
                    Update
                  </button>

                </div>
                <p className="employee__label--small">
                  Country: {employee.country}
                </p>
                <button  className="deleteButton" onClick={()=>deleteEmployees(employee.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
