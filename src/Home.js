import React from "react";
import { Link } from "react-router-dom";
import raceCar from "./assets/raceCar.png";
import { Container, SimpleGrid, Center, Button, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

function Home() {
  const { user, isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <Container centerContent>
      <SimpleGrid columns={1} spacing="20px">
        <Center>
          <img src={raceCar} alt="Race Car" />
        </Center>
        {!isAuthenticated && (
          <>
            <Center>
              <Text fontSize="xl">
                Log in or Sign Up to find out what you might qualify for
              </Text>
            </Center>
            <Center>
              <Button onClick={() => loginWithRedirect()}>
                Log In/Sign Up
              </Button>
            </Center>
          </>
        )}
        {isAuthenticated && (
          <div>
            <h2>Welcome, {user.name}</h2>
            <Center>
              <Link to="/loan-calculator">
                <Button sz="lg" color="orange">
                  Auto Loan Calculator
                </Button>
              </Link>
            </Center>
            <br />
            <Center>
              <Link to="/pre-qualification">
                <Button>Pre-Qualify</Button>
              </Link>
            </Center>
            <br />
            <Center>
              <Button
                onClick={() => logout({ returnTo: window.location.origin })}
              >
                Log Out
              </Button>
            </Center>
          </div>
        )}
      </SimpleGrid>
      
    </Container>
  );
}

export default Home;
