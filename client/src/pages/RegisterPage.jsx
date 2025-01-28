import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.scss";
import { Email,  Lock } from "@mui/icons-material";
import { AccountCircle, Person } from "@mui/icons-material";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  const [passwordStrength, setPasswordStrength] = useState({
    isStrong: false,
    requirements: {
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false
    }
  });

  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);

  const checkPasswordStrength = (password) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };

    const isStrong = Object.values(requirements).every(req => req);

    setPasswordStrength({
      isStrong,
      requirements
    });

    setShowPasswordRequirements(!isStrong && password.length > 0);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const updatedFormData = {
      ...formData,
      [name]: name === "profileImage" ? files[0] : value
    };

    setFormData(updatedFormData);

    if (name === "password") {
      checkPasswordStrength(value);
    }

    setPasswordMatch(updatedFormData.password === updatedFormData.confirmPassword || updatedFormData.confirmPassword === "");
  };

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!passwordStrength.isStrong) {
      alert("Password does not meet strength requirements!");
      return;
    }

    try {
      const register_form = new FormData()

      for (var key in formData) {
        register_form.append(key, formData[key])
      }

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: register_form
      })

      if (response.ok) {
        navigate("/login")
      }
    } catch (err) {
      console.log("Registration failed", err.message)
    }
  }

  return (
    <div className="register0">
    <div className="register">
      <div className="register_image">

</div>
      <div className="register_content">
        
        <form className="register_content_form" onSubmit={handleSubmit}>
        <h1>Welcome</h1>
          <div className="input-container">
          <AccountCircle className="icon" />
          <input
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          </div>
          <div className="input-container">
          <Person className="icon" />  
          <input
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          </div>
          <div className="input-container">
          < Email className="icon" />
          <input
            placeholder="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="input-container">
                      < Lock className="icon" />
          <input
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            required
          />
          {showPasswordRequirements && (
            <div style={{ color: "red", fontSize: "0.8rem" }}>
              Password must:
              <ul>
                {!passwordStrength.requirements.length && <li>Be at least 8 characters</li>}
                {!passwordStrength.requirements.uppercase && <li>Include an uppercase letter</li>}
                {!passwordStrength.requirements.lowercase && <li>Include a lowercase letter</li>}
                {!passwordStrength.requirements.number && <li>Include a number</li>}
                {!passwordStrength.requirements.specialChar && <li>Include a special character</li>}
              </ul>
            </div>
          )}
          </div>
          <div className="input-container">
                      < Lock className="icon" />
          <input
            placeholder="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            type="password"
            required
          />

          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
          )}
          </div>

          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleChange}
            required
          />
          <label htmlFor="image">
            <img src="/assets/addImage.png" alt="add profile photo" />
            <p>Upload Your Photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile photo"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch || !passwordStrength.isStrong}>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Log In Here</a>
      </div>
    </div>
    </div>
  );
};

export default RegisterPage;