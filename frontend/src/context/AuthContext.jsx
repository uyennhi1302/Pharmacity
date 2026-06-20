import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";


const AuthContext = createContext();


// URL backend Render
const API_URL = import.meta.env.VITE_API_URL;


export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {

    const savedUser =
      localStorage.getItem("currentUser");


    if (savedUser) {

      try {

        setUser(JSON.parse(savedUser));

      } catch {

        setUser(null);

      }

    }

  }, []);





  // LOGIN
  const login = async (email, password) => {

    setIsLoading(true);


    try {

      const res = await fetch(
        `${API_URL}/login`,
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },

          body:JSON.stringify({
            email,
            password
          })
        }
      );



      const data = await res.json();



      if(res.ok){

        setUser(data.user);


        localStorage.setItem(
          "currentUser",
          JSON.stringify(data.user)
        );


        localStorage.setItem(
          "isLogin",
          "true"
        );


        return {
          success:true,
          user:data.user
        };


      }else{


        return {
          success:false,
          message:data.message
        };


      }



    }catch(err){


      return {
        success:false,
        message:"Không kết nối được server"
      };


    }finally{

      setIsLoading(false);

    }

  };







  // REGISTER
  const register = async (userData)=>{


    setIsLoading(true);


    try{


      const res = await fetch(
        `${API_URL}/register`,
        {
          method:"POST",

          headers:{
            "Content-Type":"application/json"
          },


          body:JSON.stringify(userData)

        }
      );



      const data =
        await res.json();



      if(res.ok){

        return {
          success:true
        };


      }else{


        return {
          success:false,
          message:data.message
        };


      }



    }catch(err){


      return {
        success:false,
        message:"Không kết nối được server"
      };


    }finally{

      setIsLoading(false);

    }


  };







  const logout = ()=>{

    setUser(null);

    localStorage.removeItem(
      "currentUser"
    );

    localStorage.removeItem(
      "isLogin"
    );

  };




  return (

    <AuthContext.Provider

      value={{
        user,
        isLoading,
        login,
        register,
        logout
      }}

    >

      {children}

    </AuthContext.Provider>

  );

}





export const useAuth =
()=>useContext(AuthContext);