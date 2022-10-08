import {React, useState} from "react";
import { withRouter, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "./updateAction";
import {
  SimpleGrid,
  Center,
  Progress,
  Heading, Text,Spacer,Flex ,List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,HStack
} from "@chakra-ui/react";
import { FeedbackFish } from "@feedback-fish/react";
import Header from "./components/Header";
import {FiMenu,FiHome,FiCalendar,FiUsers,FiDollarSign,FiBriefcase,FiUser,FiSettings
} from 'react-icons/fi'
import{AiOutlineBank} from 'react-icons/ai'
import NavItem from './components/NavItem';
import {GrDocumentUpload} from 'react-icons/gr'



const Navigation = (props) => {
  
  const { action, state } = useStateMachine(updateAction);

  const [navSize, changeNavSize] = useState("large");

  //funciton to reset individual state variables

  return (
    <>
      <Header />
      
        <SimpleGrid columns={1} >

          <Center>
             <Text fontSize='lg' fontWeight="bold">
             
              </Text>

              <p style={{fontWeight:700 }}>
              We are Going to Ask You for some Information – in Order to Find You the Best Bank Deal.
              <br/>
              Please complete Step 1 (Personal Information) before moving onto Other Steps.
              <br/>
              Steps 2 (Co-Applicant) and Step 4 (Document Upload) are Optional


              </p>

       
          
          </Center>
        
          </SimpleGrid>

          <div className="coapp" style={{padding:0}}>

        <SimpleGrid spacing={4}>          
            <Center> 
            <Link to="/pre-qualification"> 
            <HStack> 
               <Text  fontSize='3xl' fontWeight="bold"> Personal Information</Text>
            </HStack>
            </Link>
            </Center>
            
           <Center> 
           <Link to="/co-app-disclaimer">
          <HStack> 
              <Text  fontSize='3xl' fontWeight="bold">Co-Applicant Information</Text>
           </HStack>
           </Link>
           </Center>
           
           <Link to="/additional-info"> 
           <Center> 
          <HStack> 
              <Text fontSize='3xl' fontWeight="bold" > Bank Selection</Text>
           </HStack>
           </Center>
           </Link>

           <Link to="/upload-page"> 
           <Center> 
          <HStack> 
              <Text fontSize='3xl' fontWeight="bold"> Document Upload</Text>
           </HStack>
           </Center>
           </Link>

          </SimpleGrid>


          <br />
       
        <FeedbackFish projectId="01ebf0d6447158">
          <button className="feedback">Give us Feedback</button>
        </FeedbackFish>
      </div>
    </>
  );
};

export default withRouter(Navigation);
