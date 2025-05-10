import { useState } from 'react'
import './App.css'
import ToggleStatus from './ToggleStatus';
import ShopsPage from './ShopsPage';

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    shopName: '',
    name: '',
    email: '',
    password: '',
    shopAddress: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/login" : "/register";
 
    try {
      const res = await fetch(`https://bandhayaopen-backend.onrender.com${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          status: "" // for register
        })
      });

      const data = await res.json();

      if (data.success) {
        alert(data.message);
        window.location.href = "/toggle"; // redirect on success
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  const path = window.location.pathname;
 if(path==="/toggle")
    return(
       <div className='mainDash'>
     <nav className='Nav'>
     <h2 className='logo'>𝗢𝗽𝗲𝗻𝘆𝗮𝗕𝗮𝗻𝗱𝗵 .(Control Portal) 🏪</h2> 
     </nav>
     <div>
      <ToggleStatus/>
     </div>
       </div>  
    )


  if (path === "/admin") {
    return (
      <div className="mainDash">
       <nav className='Nav'>
      <h2 className='logo'>𝗢𝗽𝗲𝗻𝘆𝗮𝗕𝗮𝗻𝗱𝗵(Admin Portal) 🏪</h2> </nav>
   <div className="formBox">
      <h2>{isLogin ? "Shopkeeper Login" : "Shopkeeper Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" name="shopName" placeholder="Shop Name" onChange={handleChange} required />
            <input type="text" name="name" placeholder="Owner Name" onChange={handleChange} required />
            <input type="text" name="shopAddress" placeholder="Shop Address" onChange={handleChange} required />
          </>
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
        <p onClick={() => setIsLogin(!isLogin)} className="toggleText">
          {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
        </p>
      </form>
    </div>
</div>
    );
  }

  return (
    <>
      <div className='mainDash'>
        <nav className='Nav'>
          <h2 className='logo'>𝗢𝗽𝗲𝗻𝘆𝗮𝗕𝗮𝗻𝗱𝗵 🏪</h2>
          <ul className='nav-links'>
            <li><a href="/admin" className="btn-shopkeeper">🧑‍💼 Shopkeeper Panel</a></li>
          </ul>
        </nav>
       <ShopsPage/>
      </div>
    </>
  )
}

export default App
