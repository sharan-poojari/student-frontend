import { useState, useEffect } from 'react'
import Student from './Student'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"

function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [students, setStudents] = useState([])
  const [editId, setEditId] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") !== null)
  const [loginLoading, setLoginLoading] = useState(false)
  const [studentLoading, setStudentLoading] = useState(false)
  const [usersLoading, setUsersLoading] = useState(false)
  const [error, setError] = useState("")
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [deletingId, setDeletingId] = useState(null)
  const [updatingUserId, setUpdatingUserId] = useState(null)
  const [showSignup, setShowSignup] = useState(false)
  const [signupName, setSignupName] = useState("")
  const [signupEmail, setSignupEmail] = useState("")
  const [signupPassword, setSignupPassword] = useState("")
  const [signupLoading, setSignupLoading] = useState(false)

  const studentList = async () => {
    setStudentLoading(true)
    setError("")
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/students`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
          }
        })
      const data = await response.json()
      if (response.status === 401) {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUser(null)
        return
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to load students")
      }
      console.log(data)
      setStudents(data.students)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setStudentLoading(false)
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      studentList()
      getCurrentUser()
    }
  }, [isLoggedIn])

  useEffect(() => {
    if (user && user.role === "admin") {
      getAllUsers()
    }
  }, [user])

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!name.trim()) {
      setError("Name is required")
      return
    }
    if (Number(age) <= 0) {
      setError("Age must be greater than 0")
      return
    }
    setError("")
    try {
      const token = localStorage.getItem("token")
      let response
      if (editId === "") {
        response = await fetch(`${API_BASE_URL}/api/students`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
              name: name,
              age: Number(age)
            })
          })
        if (response.status === 401) {
          localStorage.removeItem("token")
          setIsLoggedIn(false)
          setUser(null)
          return
        }
      } else {
        response = await fetch(`${API_BASE_URL}/api/students/${editId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
            },
            body: JSON.stringify({
              name: name,
              age: Number(age)
            })
          })
      }
      const data = await response.json()
      if (response.status === 401) {
        localStorage.removeItem("token")
        setIsLoggedIn(false)
        setUser(null)
        return
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to save Student")
      }
      console.log(data)
      setError("")
      setEditId("")
      setName("")
      setAge("")
      studentList()
    } catch {
      console.log(error)
      setError(error.message)
    }
  }
  const handleSignup = async (event) => {
    event.preventDefault()

    try {
      setError("")
      setSignupLoading(true)

      if (!signupName.trim()) {
        throw new Error("Name is required")
      }

      if (!signupEmail.trim()) {
        throw new Error("Email is required")
      }

      if (!signupPassword.trim()) {
        throw new Error("Password is required")
      }

      const response = await fetch(
        `${API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: signupName,
            email: signupEmail,
            password: signupPassword
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to signup")
      }

      console.log(data)

      setSignupName("")
      setSignupEmail("")
      setSignupPassword("")
      setShowSignup(false)
      setError("")
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setSignupLoading(false)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      setError("")
      setLoginLoading(true)
      const response = await fetch(`${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to login")
      }
      console.log(data)
      localStorage.setItem("token", data.token)
      setIsLoggedIn(true)
      setError("")
      setEmail("")
      setPassword("")
    } catch (error) {
      setError(error.message)
    } finally {
      setLoginLoading(false)
    }
  }

  const getCurrentUser = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/auth/me`,
        {
          method: "GET",
          headers: { "Authorization": "Bearer " + token }
        })
      const data = await response.json()
      if (response.status === 401) {
        handleLogout()
        return
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to load user")
      }
      setUser(data.user)
      console.log(data.user)
    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  const getAllUsers = async () => {
    try {

      setUsersLoading(true)
      setError("")
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_BASE_URL}/api/auth/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        }
      })
      const data = await response.json()
      if (response.status === 401) {
        handleLogout()
        return
      }
      if (!response.ok) {
        throw new Error(data.message || "Failed to load users")
      }
      setUsers(data.users)
      console.log(data.users)
    } catch (error) {
      console.log(error)
      setError(error.message)
    } finally {
      setUsersLoading(false)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem("token")
    setIsLoggedIn(false)
    setUser(null)
    setError("")
  }

  return (
    <>
      {isLoggedIn ? (
        <div>
          <header className='dashboard-header'>
            <div>
              <h1>Hello {user && user.name}</h1>
              <div>Role: {user && user.role}</div>
            </div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </header>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Students</h3>
              <p>{students.length}</p>
            </div>
            <div className="stat-card">
              <h3>Your Role</h3>
              <p>{user && user.role}</p>
            </div>
          </div>
          <section>
            <h2>Student Management</h2>
            {editId !== "" && (
              <p className="edit-message">
                Editing student...
              </p>
            )}
            <form onSubmit={handleSubmit}>
              <div className='student-form'>
                <input type="text"
                  value={name}
                  placeholder='Enter your name'
                  onChange={(event) => setName(event.target.value)}
                />
                <input type="number"
                  value={age}
                  placeholder='Enter your age'
                  onChange={(event) => setAge(event.target.value)}
                />
                <button type="Submit" disabled={studentLoading}>
                  {studentLoading ? "Saving..." :
                    editId === "" ?
                      "Submit" : "Update"}
                </button>
                {editId !== "" && (
                  <button type="button" onClick={() => {
                    setEditId("")
                    setName("")
                    setAge("")
                  }}>
                    Cancel
                  </button>
                )}
              </div>
            </form>
            {studentLoading && <p>Loading students.....</p>}
            {error && (
              <p className="error-message">
                {error}
              </p>
            )}
            {students.length === 0 && !studentLoading && (
              <p className="empty-message">
                No students found. Add your first student above.
              </p>
            )}
            {students.map((student) => (
              <div className="student-row" key={student._id}>
                <span>
                  {student.name} - {student.age}
                </span>
                <div className="student-actions">
                  <button onClick={() => {
                    setEditId(student._id)
                    setName(student.name)
                    setAge(student.age)
                  }}>Edit</button>
                  <button disabled={deletingId === student._id}
                    onClick={async () => {
                      try {
                        setDeletingId(student._id)
                        const token = localStorage.getItem("token")
                        const response = await fetch(`${API_BASE_URL}/api/students/${student._id}`, {
                          method: "DELETE",
                          headers: {
                            "Authorization": "Bearer " + token
                          }
                        }
                        )
                        const data = await response.json()
                        if (response.status === 401) {
                          handleLogout("")
                          return
                        }
                        if (!response.ok) {
                          throw new Error(data.message || "Failed to delete student")
                        }
                        console.log(data)
                        await studentList()
                      } catch (error) {
                        console.log(error)
                        setError(error.message)
                      } finally {
                        setDeletingId(null)
                      }
                    }}>
                    {deletingId === student._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </section>
          {user && user.role === "admin" && (
            <section>
              <h2>User Management</h2>
              {usersLoading && <p>Loading users...</p>}
              {users.length === 0 && !usersLoading && (
                <p className="empty-message">
                  No users found.
                </p>
              )}
              {users.map((account) => (
                <div className="user-row" key={account._id}>
                  <div className="user-info">
                    <p>
                      {account.name}-
                      {account.email}-
                      {account.role}
                    </p>
                  </div>
                  <button disabled={updatingUserId === account._id}
                    onClick={async () => {
                      try {
                        setUpdatingUserId(account._id)
                        const _id = account._id
                        const token = localStorage.getItem("token")
                        const response = await fetch(`${API_BASE_URL}/api/auth/users/${_id}/role`,
                          {
                            method: "PUT",
                            headers: {
                              "authorization": "Bearer " + token,
                              "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                              role: account.role === "admin" ? "user" : "admin"
                            })
                          }
                        )
                        const data = await response.json()
                        if (response.status === 401) {
                          handleLogout()
                          return
                        }
                        if (!response.ok) {
                          throw new Error(data.message || "Failed to Update Users")
                        }
                        setError("")
                        await getAllUsers()
                      } finally {
                        setUpdatingUserId(null)
                      }
                    }
                    }>
                    {updatingUserId === account._id
                      ? "Updating..."
                      : account.role === "admin"
                        ? "User"
                        : "Admin"}
                  </button>
                </div>
              ))}
            </section>
          )}
          <button onClick={handleLogout}>Logout</button>
        </div>

      ) : (
        <>
          {!showSignup ? (
            <>
              <h1>Login</h1>
              {error && <p>{error}</p>}
              <form className='login-form' onSubmit={handleLogin}>
                <input type="text"
                  value={email}
                  placeholder='Enter your email'
                  onChange={(event) => setEmail(event.target.value)}
                />
                <input type="password"
                  value={password}
                  placeholder='Enter your password'
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button type="submit" disabled={loginLoading}>
                  {loginLoading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setShowSignup(true)}
                >
                  Sign Up
                </button>
              </p>
            </>
          ) : (
            <>
              <h1>Signup</h1>

              {error && <p className="error-message">{error}</p>}

              <form className="login-form" onSubmit={handleSignup}>
                <input
                  type="text"
                  value={signupName}
                  placeholder="Enter your name"
                  onChange={(event) => setSignupName(event.target.value)}
                />

                <input
                  type="email"
                  value={signupEmail}
                  placeholder="Enter your email"
                  onChange={(event) => setSignupEmail(event.target.value)}
                />

                <input
                  type="password"
                  value={signupPassword}
                  placeholder="Enter your password"
                  onChange={(event) => setSignupPassword(event.target.value)}
                />

                <button type="submit" disabled={signupLoading}>
                  {signupLoading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <button
                type="button"
                onClick={() => setShowSignup(false)}
              >
                Back to Login
              </button>
            </>
          )}
        </>
      )}
    </>
  )
}


export default App
