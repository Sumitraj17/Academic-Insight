import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import toast from "react-hot-toast";
import { IoLogIn } from "react-icons/io5";
import { useEffect} from "react";
import { Button } from "@mui/material";

const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      toast.loading("Logging out", { id: "logout" });
      await auth?.logout();
      toast.success("Logged out Successfully!", { id: "logout" });
    } catch (error) {
      toast.error("Logout Failed", { id: "logout" });
    }
  };
  useEffect(()=>{
    if(!auth?.isLoggedIn){
        return navigate("/");
    }
  },[auth]);
  return (

    <div>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          sx={{
            px: 2,
            py: 1,
            mt: 2,
            width: "400px",
            borderRadius: 2,
            bgcolor: "lightblue",
            color: "red",
            "hover": {
              bgcolor: "black",
              color: "white",
            },
          }}
          endIcon={<IoLogIn />}
        >
          Logout
        </Button>
      </form>
    </div>
  );
};
export default Logout;
