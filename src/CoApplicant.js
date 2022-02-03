import React from "react";
import { withRouter, Link } from "react-router-dom";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading,
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";

const CoApplicant = (props) => {
  return (
    <>
      <Header />
      <div className="coapp">
        <SimpleGrid columns={1} spacing={10}>
          <Center>
            <Heading>Do You Have a Co-Applicant?</Heading>
          </Center>
          <Center>
            <p>
              Having a well qualified coapplicant can significantly boost your
              ability to get the auto-loan of your dreams. In the case of{" "}
              <strong>students</strong>, <strong>retired</strong> or <strong>unemployed</strong> persons,
              you are in most cases <strong>required</strong> to have a coapplicant to be
              considered for a loan.{" "}
              <br />
              <br />
              Where mortgage, rent or other obligations are joint, you may show the entire monthly payment under either applicant, or split between the two applicants
            </p>
          </Center>
          <Center>
            <Link to="/ca-applicant-details">
              <button className="inline-button" type="submit">
                Yes
              </button>
            </Link>
            <Link to="/result">
              <button className="inline-button" type="submit">
                No
              </button>
            </Link>
          </Center>
          <br />
        </SimpleGrid>
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(CoApplicant);
