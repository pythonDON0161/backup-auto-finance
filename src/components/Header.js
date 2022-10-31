import React from "react";
import "tailwindcss/tailwind.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory,Link } from "react-router-dom";
import { Button,Drawer,DrawerBody,Input,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure} from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";


function Header() {
  let history = useHistory();
  function handleClick() {
    history.goBack();
  }

  const btnRef = React.useRef()
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (

    <div className="relative">
    
      <Drawer isOpen={isOpen}
          placement='left'
          onClose={onClose}
              finalFocusRef={btnRef}>
                <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
            
          </Drawer>

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
         
              <Button
                className="ml-8 lg:ml-10"
              > <Link to="/"> 
                Home
                </Link>
              </Button>
             
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
                  logout({
                    redirectUri: `${window.location.origin}/`,
                  })
                }
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
