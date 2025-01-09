import { Button, Checkbox, Heading, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../../config/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    confirm: "",
    terms: "",
  });

  const navigate = useNavigate();

  function handleFormDataChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (formData.password !== formData.confirm) {
      alert("Passwords do not match");
    } else {
      setIsRegistering(true);
      try {
        const { username, password, email } = formData;
        await API.post("/auth/register", { username, password, email });
        alert("Registration successful!");
        navigate("/login");
      } catch (e) {
        console.error(e);
        alert("Registration failed. Please try again.");
      }
      setIsRegistering(false);
    }
  }

  function handleTermsChange() {
    setFormData({
      ...formData,
      terms: formData.terms === "checked" ? "" : "checked",
    });
  }

  return (
    <>
      <div className="flex flex-col items-center ">
        <div className="bg-zinc-900 mt-28 rounded-lg text-center flex">
          <div className="px-10 py-10 flex flex-col  min-w-[35rem]">
            <div className="mb-6">
              <Heading>Register</Heading>
            </div>
            <div>
              <form onSubmit={handleFormSubmit}>
                {["Username", "Email", "Password", "Confirm"].map((field) => (
                  <TextField.Root
                    key={field}
                    type={
                      field === "Password" || field === "Confirm"
                        ? "password"
                        : field === "Email"
                        ? "email"
                        : "text"
                    }
                    name={field.toLowerCase()}
                    placeholder={
                      field == "Confirm" ? "Confirm Password" : field
                    }
                    value={
                      formData[field.toLowerCase() as keyof typeof formData]
                    }
                    required
                    onChange={handleFormDataChange}
                    className=" my-4 min-h-[3rem]"
                    minLength={
                      field == "Password" || field === "Confirm" ? 8 : undefined
                    }
                  />
                ))}
                <div className="flex gap-2 items-center">
                  <Checkbox
                    required
                    value={formData.terms}
                    onClick={handleTermsChange}
                  />
                  Agree to Terms and Conditions
                </div>
                <div className="mt-4">
                  <Button
                    type="submit"
                    color="gray"
                    variant="outline"
                    highContrast
                    loading={isRegistering ? true : false}
                  >
                    Sign up
                  </Button>
                </div>
              </form>
              <div className="mt-6">
                <Text className="text-gray-300">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-500">
                    Login
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

export default Register;
