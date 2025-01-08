import { TextField } from "@radix-ui/themes";
import { useState } from "react";

const Register = () => {
  const [username, setusername] = useState("");

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setusername(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="">
          <div>
            <h1>Register</h1>
          </div>
          <div>
            <TextField.Root
              placeholder="Username"
              value={username}
              onChange={handleUsernameChange}
              className="min-w-full"
            />
          </div>
        </div>
        <h1>{username}</h1>
      </div>
    </>
  );
};

export default Register;
