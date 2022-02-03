import React from "react";
import "tailwindcss/tailwind.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";

function Header() {
  let history = useHistory();
  function handleClick() {
    history.goBack();
  }
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <div className="relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between border-b-2 border-gray-100 pb-6">
          <div className="flex justify-start items-center">
            <div className="mb-3 self-end">
              <Tooltip hasArrow label="Back" aria-label="A tooltip">
                <span>
                  <FaArrowLeft
                    className="cursor-pointer"
                    onClick={handleClick}
                  />
                </span>
              </Tooltip>
            </div>
            <div>
              <img className="w-24 h-auto ml-5" src="/raceCar.png" alt="Logo" />
            </div>
          </div>
          <div className="md:flex items-center pt-8">
            {!isAuthenticated && (
              <Button
                onClick={() =>
                  loginWithRedirect({
                    redirectUri: `${window.location.origin}/pre-qualification`,
                  })
                }
                className="ml-8 lg:ml-10"
              >
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="ml-8 lg:ml-10"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
