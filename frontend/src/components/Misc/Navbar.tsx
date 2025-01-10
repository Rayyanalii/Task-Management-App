import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  HoverCard,
  Link,
  Switch,
  Text,
} from "@radix-ui/themes";
import { DarkModeContext } from "../../contexts/DarkModeContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar = () => {
  const { setToken } = useContext(AuthContext);
  const { isDarkMode, setDarkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();

  function handleDarkModeToggle() {
    setDarkMode(!isDarkMode);
    localStorage.setItem("darkmode", !isDarkMode ? "true" : "false");
  }

  function handleLogout() {
    setToken(null);
    navigate("/login");
  }

  return (
    <>
      <div
        className={`${
          !isDarkMode ? "bg-gray-100" : "bg-zinc-900"
        } h-16 px-10 flex items-center justify-end`}
      >
        <div className="flex gap-10 items-center">
          {localStorage.getItem("token") && (
            <div>
              <Button variant="outline" color="gray" onClick={handleLogout}>
                <div>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z"
                      fill="currentColor"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </div>
                Logout
              </Button>
            </div>
          )}

          <div>
            <Text as="label" size="3">
              <Flex gap="2">
                <Switch
                  size="2"
                  defaultChecked={isDarkMode}
                  onClick={handleDarkModeToggle}
                />{" "}
                Dark Mode
              </Flex>
            </Text>
          </div>
          <div>
            <Text>
              Made by{" "}
              <HoverCard.Root>
                <HoverCard.Trigger>
                  <Link href="https://twitter.com/radix_ui" target="_blank">
                    @Rayyanalii
                  </Link>
                </HoverCard.Trigger>
                <HoverCard.Content maxWidth="300px">
                  <Flex gap="4">
                    <Avatar
                      size="3"
                      fallback="R"
                      radius="full"
                      src="https://pbs.twimg.com/profile_images/1337055608613253126/r_eiMp2H_400x400.png"
                    />
                    <Box>
                      <Heading size="3" as="h3">
                        Rayyan Ali
                      </Heading>
                      <Text as="div" size="2" color="gray" mb="2">
                        @rayyanalii
                      </Text>
                      <Text as="div" size="2">
                        React components, icons, and colors for building
                        high-quality, accessible UI.
                      </Text>
                    </Box>
                  </Flex>
                </HoverCard.Content>
              </HoverCard.Root>{" "}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
