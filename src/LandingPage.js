import React from "react";
import "tailwindcss/tailwind.css";
import { Link } from "react-router-dom";
import highway from "./assets/highway.jpg";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <div>
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-screen-xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <svg
              className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
              fill="currentColor"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>

            <div className="relative lg:pt-6 px-4 sm:px-6 lg:px-8">
              <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
                <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                  <div className="flex items-center justify-between w-full md:w-auto mt-0">
                    <a href="/">
                      <img
                        className="h-auto w-24"
                        src="/raceCar.png"
                        alt="Logo"
                      />
                    </a>
                    <div className="-mr-2 flex items-center md:hidden"></div>
                  </div>
                </div>
                <div className="lg:mt-4 md:block md:ml-10 lg:ml-96 md:pr-4">
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
                      onClick={() =>
                        logout({ returnTo: window.location.origin })
                      }
                      className="ml-8 lg:ml-10"
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </nav>
            </div>
            <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-5xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                  Get on the Road
                </h2>
                <h3 className="mt-6 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Shop around
                <br/> <br/>
                Compare auto loan offers in a few simple steps
                  <br />
                  <br />
                  Get started by using the loan calculator to estimate your payment.
                </h3>
                <div className="mt-3 sm:mt-5 ">
                  <Link to="/loan-calculator">
                    <Button className="mr-5 mb-3">Loan Calculator</Button>
                  </Link>
                </div>
                <h3 className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Compare loan offers to find the loan that is right for you
                </h3>
                <div className="mt-3 sm:mt-5 ">
                  <Link to="/navigation">
                    <Button className="mr-5 mb-5">Find Bank Deals (Start or Continue Application)</Button>
                  </Link>
                </div>
                <p className="text-base text-gray-500">
                  (For individuals and self-employed only, not companies)
                </p>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={highway}
            alt="North/South Highway"
          />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
