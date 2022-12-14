import React from 'react'
import {Flex,Text,Icon,Link,Menu,MenuButton,MenuList} from '@chakra-ui/react'
import '../assets/sidebar.css'



export default function NavItem({ icon, title, description, active, navSize }) {
    return (
        <Flex
            mt={30}
            flexDir="column"
            w="100%"
            alignItems={navSize == "small" ? "center" : "flex-start"}
        >
            <Menu placement="left">
                <Link
                    to="/"
                    p={3}
                    borderRadius={8}
                    background ={active ? "#e65323": "#00000" }
                    color = {active ? "#ffff": "#00000"}
                    _hover={{ textDecor: 'none', backgroundColor: "#e65323" }}
                    w={navSize == "large" && "100%"}
                >
                    <MenuButton w="100%">
                        <Flex>
                            <Icon as={icon} fontSize="xl" color={active ? "#fff" : "gray.500"} />
                            <Text ml={5} fontSize="sm" display={navSize == "small" ? "none" : "flex"}>{title}</Text>
                        </Flex>
                    </MenuButton>
                </Link>
                <MenuList
                    py={0}
                    border="none"
                    w={200}
                    h={200}
                    ml={5}
                >
                   
                </MenuList>
            </Menu>
        </Flex>
    )
}