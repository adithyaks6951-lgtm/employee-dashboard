import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'

function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand">People<span>Desk</span></NavLink>
      <nav>
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/employee-form">Employee Form</NavLink>
      </nav>
    </header>
  )
}

function Dashboard() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        if (!response.ok) throw new Error('Could not load employees.')
        return response.json()
      })
      .then(setEmployees)
      .catch(() => setError('Unable to load data. Please check your internet connection and refresh.'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <main className="container">
      <section className="welcome">
        <div>
          <p className="eyebrow">OVERVIEW</p>
          <h1>Employee Dashboard</h1>
          <p className="muted">View employee information in one place.</p>
        </div>
        <div className="count"><strong>{employees.length}</strong><span>Employees</span></div>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <div><h2>Employee Directory</h2><p className="muted">Employee ID, name and email address</p></div>
        </div>
        {loading ? <p className="status">Loading employees…</p> : error ? <p className="status error">{error}</p> : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>ID</th><th>Name</th><th>Email</th></tr></thead>
              <tbody>{employees.map((employee) => (
                <tr key={employee.id}>
                  <td><span className="id-pill">#{employee.id}</span></td>
                  <td><div className="person"><span className="avatar">{employee.name.charAt(0)}</span><strong>{employee.name}</strong></div></td>
                  <td><a className="email" href={`mailto:${employee.email}`}>{employee.email}</a></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
      <p className="footer-note">Employee information is fetched from JSONPlaceholder API.</p>
    </main>
  )
}

function EmployeeForm() {
  const [form, setForm] = useState({ name: '', designation: '', location: '', salary: '' })
  const [message, setMessage] = useState('')
  const update = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
    setMessage('')
  }
  const submit = (event) => {
    event.preventDefault()
    setMessage('Form validated successfully. As required, no data was sent to a backend.')
  }

  return (
    <main className="container form-page">
      <p className="eyebrow">EMPLOYEE MANAGEMENT</p>
      <h1>Employee Form</h1>
      <p className="muted intro">Enter the employee details below.</p>
      <section className="panel form-panel">
        <form onSubmit={submit}>
          <label>Full Name<input name="name" value={form.name} onChange={update} placeholder="Enter employee name" required /></label>
          <label>Designation<input name="designation" value={form.designation} onChange={update} placeholder="e.g. Software Developer" required /></label>
          <label>Location<input name="location" value={form.location} onChange={update} placeholder="e.g. Kochi" required /></label>
          <label>Salary<input name="salary" type="number" min="0" value={form.salary} onChange={update} placeholder="Enter salary" required /></label>
          <button type="submit" className="primary-btn">Validate Form</button>
          {message && <p className="success" role="status">{message}</p>}
        </form>
        <p className="form-note">Note: This assignment does not require posting data from the frontend.</p>
      </section>
    </main>
  )
}

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
        <Route path="*" element={<main className="container"><h1>Page not found</h1><NavLink to="/">Return Home</NavLink></main>} />
      </Routes>
    </>
  )
}