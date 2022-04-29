const { createContext, useState, useEffect, useContext } = require("react");
const { Navigate, useNavigate } = require("react-router-dom");

const UserContext = createContext()//name the context

// context Api to put states at top
const UserProvider = ({ children }) => {//wraps whole app; children is whole APP

    const [user,setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setUser(userInfo);

        if(!userInfo){
            navigate('/')
        }
    },[navigate]);

    return(
        <UserContext.Provider
            value = {{ user,setUser }} 
        >
            {children}
        </UserContext.Provider>
    )

}


    export const UserState = () => {
        return useContext(UserContext);
    };

    export default UserProvider;