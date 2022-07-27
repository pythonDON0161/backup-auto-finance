import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading,
    Link
} from '@chakra-ui/react'
import {
    FiMenu,
    FiHome,
    FiCalendar,
    FiUser,
    FiDollarSign,
    FiBriefcase,
    FiSettings
} from 'react-icons/fi'


import { IoPawOutline } from 'react-icons/io5'
import NavItem from '../components/NavItem'


export default function Sidebar() {
    const [navSize, changeNavSize] = useState("large")
    return (
        <Flex
            background=""
            pos="sticky"
            top="0"
            left="0"
            color="gray.500"
            h="100%"
            marginTop="0"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={0}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
            transform=" translateX(0%) translateY(0px) translateZ(0px) "
        >
            <Flex
                p="5%"
                flexDir="column"
                marginTop="0"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<FiMenu />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                {/*Wrap each Navitem in a Link Component and add a href to use it like anchor tag*/}

                <Link href="/" to="/ca-applicant-details">
                    <NavItem navSize={navSize} icon={FiHome} title="Home" description="This is the description for the dashboard." >
                   
                    </NavItem>
                     {/*TODO: Link to different pages in the application options include : using anchor tag using react link component*/ }

                </Link>

                <Link href="/applicant-details" > 
                     <NavItem navSize={navSize} icon={FiCalendar} title="Personal Information"  />
                </Link>

                <Link href="/employment-details"> 
                   <NavItem navSize={navSize} icon={FiCalendar} title="Co-Applicant (Optional)" />
                </Link>

                <Link href="/monthly-expenses"> 
                    {/*<NavItem navSize={navSize} icon={AiFillBank} title="Bank Selection" />*/}   
                </Link>

                <Link href="/trade-in"> 
                   <NavItem navSize={navSize} icon={FiBriefcase} title="Additional Information" />
                </Link>

                <Link href="/co-applicant"> 
                  <NavItem navSize={navSize} icon={FiSettings} title="Document Upload (Optional)" />
                </Link>

            </Flex>

            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none" : "flex"} />
                <Flex mt={4} align="center">
                    <Avatar size="sm" src="avatar-1.jpg" />
                    <Flex flexDir="column" ml={4} display={navSize == "small" ? "none" : "flex"}>
                        <Heading as="h3" size="sm"></Heading>
                        <Text color="gray">Admin</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    )
}