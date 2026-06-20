import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {

  const navigate = useNavigate();
  const { register, isLoading } = useAuth();


  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");


  const [form, setForm] = useState({

    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",

  });



  const handleChange = (e)=>{

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };





  const handleRegister = async(e)=>{

    e.preventDefault();

    setError("");



    if(
      !form.firstName ||
      !form.lastName ||
      !form.phone ||
      !form.email ||
      !form.address ||
      !form.password ||
      !form.confirmPassword
    ){

      setError(
        "Vui lòng nhập đầy đủ thông tin!"
      );

      return;
    }



    if(
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(form.email)
    ){

      setError(
        "Email không hợp lệ!"
      );

      return;

    }



    if(
      !/^[0-9]{10}$/
      .test(form.phone)
    ){

      setError(
        "Số điện thoại phải đủ 10 số!"
      );

      return;

    }




    if(
      form.password !== form.confirmPassword
    ){

      setError(
        "Mật khẩu nhập lại không khớp!"
      );

      return;

    }




    const userData={

      first_name:form.firstName,

      last_name:form.lastName,

      phone:form.phone,

      email:form.email,

      address:form.address,

      password:form.password,

      role:"customer"

    };





    const result =
      await register(userData);




    if(result.success){

      alert(
        "Đăng ký thành công!"
      );


      navigate("/login");


    }else{


      setError(
        result.message ||
        "Đăng ký thất bại!"
      );


    }

  };





  return (

    <div style={styles.page}>


      <div style={styles.box}>


        <h1 style={styles.title}>
          Đăng Ký Tài Khoản
        </h1>



        {
          error &&
          <p style={styles.error}>
            {error}
          </p>
        }




        <form onSubmit={handleRegister}>


          <input

            type="text"

            name="lastName"

            placeholder="Họ"

            value={form.lastName}

            onChange={handleChange}

            style={styles.input}

          />



          <input

            type="text"

            name="firstName"

            placeholder="Tên"

            value={form.firstName}

            onChange={handleChange}

            style={styles.input}

          />



          <input

            type="text"

            name="phone"

            placeholder="Số điện thoại"

            value={form.phone}

            onChange={handleChange}

            style={styles.input}

          />




          <input

            type="email"

            name="email"

            placeholder="Email"

            value={form.email}

            onChange={handleChange}

            style={styles.input}

          />




          <input

            type="text"

            name="address"

            placeholder="Địa chỉ"

            value={form.address}

            onChange={handleChange}

            style={styles.input}

          />





          <div style={{position:"relative"}}>


            <input

              type={
                showPassword
                ? "text"
                : "password"
              }

              name="password"

              placeholder="Mật khẩu"

              value={form.password}

              onChange={handleChange}

              style={styles.input}

            />



            <span

              onClick={()=>
                setShowPassword(!showPassword)
              }

              style={styles.eye}

            >

              {
                showPassword
                ? <FaEye/>
                : <FaEyeSlash/>
              }

            </span>


          </div>






          <div style={{position:"relative"}}>


            <input

              type={
                showConfirmPassword
                ? "text"
                : "password"
              }

              name="confirmPassword"

              placeholder="Nhập lại mật khẩu"

              value={form.confirmPassword}

              onChange={handleChange}

              style={styles.input}

            />



            <span

              onClick={()=>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }

              style={styles.eye}

            >


              {
                showConfirmPassword
                ? <FaEye/>
                : <FaEyeSlash/>
              }


            </span>


          </div>





          <button

            type="submit"

            style={styles.btn}

            disabled={isLoading}

          >

            {
              isLoading
              ?
              "Đang xử lý..."
              :
              "Đăng Ký"
            }


          </button>




        </form>


      </div>


    </div>

  );

}






const styles={


page:{

backgroundColor:"#b5ebff",

minHeight:"100vh",

display:"flex",

justifyContent:"center",

alignItems:"center",

padding:30

},



box:{

backgroundColor:"#fff",

width:500,

padding:35,

borderRadius:15,

boxShadow:"0 4px 15px rgba(0,0,0,0.2)"

},



title:{

textAlign:"center",

color:"#0099cc",

marginBottom:25

},



input:{

width:"100%",

padding:12,

marginBottom:12,

borderRadius:8,

border:"1px solid #ccc",

boxSizing:"border-box"

},



eye:{

position:"absolute",

right:15,

top:"40%",

transform:"translateY(-50%)",

cursor:"pointer",

color:"#0099cc",

fontSize:18

},



btn:{

width:"100%",

padding:12,

backgroundColor:"#0099cc",

color:"#fff",

border:"none",

borderRadius:8,

fontSize:16,

cursor:"pointer",

marginTop:10

},



error:{

background:"#ffebee",

color:"#c62828",

padding:10,

borderRadius:6,

marginBottom:15,

fontSize:14

}


};