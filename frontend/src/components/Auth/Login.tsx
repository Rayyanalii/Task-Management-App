import { Button, Heading, Text, TextField } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLoggingIn, setisLoggingIn] = useState(false);
  const [message, setMessage] = useState("");
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    email: "",
  });

  function handleFormDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setisLoggingIn(true);
    try {
      const { password, email } = formData;
      const response = await API.post("/auth/login", { email, password });
      setMessage(response.data.message);
      setToken(response.data.token);
      navigate("/");
    } catch (e) {
      console.error(e);

      alert("Login failed. Please try again.");
    }
    setisLoggingIn(false);
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="bg-zinc-900 mt-44 rounded-lg text-center flex">
          <div className="px-10 py-10 flex flex-col  min-w-[35rem]">
            <div className="mb-6">
              <Heading>Login</Heading>
            </div>
            <div>
              <form onSubmit={handleFormSubmit}>
                {["Email", "Password"].map((field) => (
                  <TextField.Root
                    key={field}
                    type={field === "Password" ? "password" : "email"}
                    name={field.toLowerCase()}
                    placeholder={field}
                    value={
                      formData[field.toLowerCase() as keyof typeof formData]
                    }
                    required
                    onChange={handleFormDataChange}
                    className=" my-4 min-h-[3rem]"
                    minLength={field == "Password" ? 8 : undefined}
                  />
                ))}
                <div>
                  <Text>{message}</Text>
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    color="gray"
                    variant="outline"
                    highContrast
                    loading={isLoggingIn ? true : false}
                  >
                    Login
                  </Button>
                </div>
              </form>
              <div className="mt-6">
                <Text className="text-gray-300">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-blue-500">
                    Signup
                  </Link>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
