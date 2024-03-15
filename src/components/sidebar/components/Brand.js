import React, { useContext } from "react";

// Chakra imports
import { Flex, IconButton, useColorModeValue } from "@chakra-ui/react";

// Custom components
import { HorizonLogo } from "components/icons/Icons";
import { HSeparator } from "components/separator/Separator";

import { SidebarContext } from "contexts/SidebarContext";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse } from "react-icons/tb";

export function SidebarBrand() {
  //   Chakra color mode
  let logoColor = useColorModeValue("navy.700", "white");
  const { toggleSidebar, setToggleSidebar } = useContext(SidebarContext);
  return (
    <Flex align="center" direction="column">
      <Flex align="center" direction="row" justifyContent="space-between">
        {!toggleSidebar && <HorizonLogo
          h="26px"
          w="175px"
          my="32px"
          color={logoColor}
        />}
        <IconButton
          aria-label={toggleSidebar ? "Collapse Sidebar" : "Expand Sidebar"}
          icon={!toggleSidebar ? <TbLayoutSidebarLeftCollapse size="sm"/> : <TbLayoutSidebarRightCollapse />}
          onClick={() => {
            setToggleSidebar(!toggleSidebar);
          }}
          marginLeft={2}
          zIndex="1"
        />
      </Flex>
      <HSeparator mb="20px" />
    </Flex>
  );
}

export default SidebarBrand;
