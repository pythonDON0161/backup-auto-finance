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
                <p>At Deal Selecta JA, our automobile financing web application, we prioritize the protection of your privacy. We understand that you trust us with your personal information and we take this responsibility seriously.</p>
                <br />
                <p>When you use Deal Selecta JA, we may collect specific information about you, such as your name, email address, and other details relevant to your car financing needs. Rest assured, we solely utilize this information to provide you with the best financing options and enhance our platform. We never share your information with third-party companies or individuals, unless required by law.</p>
                <br />
                <p>To improve our services and tailor the platform to your needs, we may employ cookies to gather data on your browsing activity within Deal Selecta JA.</p>
                <br />
                <p>We implement a variety of security measures to safeguard your personal information, both online and offline. Our platform is hosted on secure servers and all data transmission occurs through SSL encryption.</p>
                <br />
                <p>By using Deal Selecta JA, you consent to the terms outlined in this privacy policy. Please note that we reserve the right to modify this policy at any time. Any updates will be promptly posted on this page and will take immediate effect.</p>
                <br />
                <p>If you have any inquiries or concerns regarding our privacy policy, please don't hesitate to contact us at:</p>
                <br />
                <p><a href="mailto:admin@dealselectaja.com">admin@dealselectaja.com</a></p>
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
