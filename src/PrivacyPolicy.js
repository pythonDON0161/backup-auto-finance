import "tailwindcss/tailwind.css";
import highway from "./assets/highway.jpg";
import { Button } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import raceCar from "./assets/raceCar.png";

function PrivacyPolicy() {
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
                        src={raceCar}
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
                  Privacy Policy
                </h2>
                <h3 className="mt-6 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                At our automobile financing web application, we are committed to protecting your privacy. We understand that you trust us with your personal information and we take that responsibility seriously.
                <br />
                <br />
                When you use our platform, we may collect certain information about you, such as your name, email address, and other details related to your car financing needs. We use this information solely to provide you with the best financing options available and to improve our platform. We do not share your information with third-party companies or individuals unless required by law.
                <br />
                <br />
                We may also use cookies to collect data about your browsing activity on our platform. This helps us improve our services and tailor our platform to better meet your needs.
                <br />
                <br />
                We implement a variety of security measures to protect your personal information, both online and offline. Our platform is hosted on secure servers and all data is transmitted using SSL encryption.
                <br />
                <br />
                By using our automobile financing web application, you consent to the terms of this privacy policy. We reserve the right to modify this policy at any time. Any changes will be posted on this page and will be effective immediately upon posting.
                <br />
                <br />
                If you have any questions or concerns about our privacy policy, please do not hesitate to contact us at: <br /> <strong>admin@dealselectaja.com</strong>
                </h3>
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

export default PrivacyPolicy;
