/* eslint-disable */
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2023 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "components/separator/Separator";
import DefaultAuth from "layouts/auth/Default";
// Assets
import illustration from "assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import axios from "axios";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import CustomTextField from "./components/CustomTextField";

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue({ bg: "gray.200" }, { bg: "whiteAlpha.300" });
  const googleActive = useColorModeValue({ bg: "secondaryGray.300" }, { bg: "whiteAlpha.200" });
  const [show, setShow] = React.useState(false);

  const [networkError, setNetworkError] = useState(null);

  const handleClick = () => setShow(!show);

  const history = useHistory();

  const VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email().required("This field is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("This field is required"),
  });

  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleSignIn = async (values, setSubmitting) => {
    setSubmitting(false);
    const { email, password } = values;
    const config = {
      method: "post",
      url: "http://example.com/User/login",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      data: {
        email,
        password,
      },
    };

    try {
      const response = await axios(config);
      // Check if the access token is present in the response
      const accessToken = response.data.token;
      const errors = response.data.errors;
      if (accessToken) {
        const currentTime = new Date().getTime();
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("sessionTimestamp", currentTime);
        history.push("/admin/default");
      } else {
        // Handle the case where no access token is present
        console.error("Login failed:", errors[0]);
        setNetworkError(errors[0]);
        // TODO: Show an error message to the user
      }
    } catch (error) {
      console.error("An error occurred during the sign-in process", error);
      setNetworkError(error);
      // TODO: Handle error e.g. show error message to the user
    }
  };

  console.log(networkError);

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Box>
        <Flex
          maxW={{ base: "100%", md: "max-content" }}
          w="100%"
          mx={{ base: "auto", lg: "0px" }}
          me="auto"
          h="100%"
          alignItems="start"
          justifyContent="center"
          mb={{ base: "30px", md: "60px" }}
          px={{ base: "25px", md: "0px" }}
          mt={{ base: "40px", md: "14vh" }}
          flexDirection="column"
        >
          <Box me="auto">
            <Heading color={textColor} fontSize="36px" mb="10px">
              Sign In
            </Heading>
            <Text mb="36px" ms="4px" color={textColorSecondary} fontWeight="400" fontSize="md">
              Enter your email and password to sign in!
            </Text>
          </Box>
          <Flex
            zIndex="2"
            direction="column"
            w={{ base: "100%", md: "420px" }}
            maxW="100%"
            background="transparent"
            borderRadius="15px"
            mx={{ base: "auto", lg: "unset" }}
            me="auto"
            mb={{ base: "20px", md: "auto" }}
          >
            <Button
              fontSize="sm"
              me="0px"
              mb="26px"
              py="15px"
              h="50px"
              borderRadius="16px"
              bg={googleBg}
              color={googleText}
              fontWeight="500"
              _hover={googleHover}
              _active={googleActive}
              _focus={googleActive}
            >
              <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
              Sign in with Google
            </Button>
            <Flex align="center" mb="25px">
              <HSeparator />
              <Text color="gray.400" mx="14px">
                or
              </Text>
              <HSeparator />
            </Flex>
            <Formik
              initialValues={INITIAL_VALUES}
              validationSchema={VALIDATION_SCHEMA}
              onSubmit={(values, { setSubmitting }) => handleSignIn(values, setSubmitting)}
            >
              {(formik) => (
                <Form>
                  <FormControl isInvalid={formik.errors.email && formik.touched.email} mb="24px">
                    <FormLabel
                      display="flex"
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      mb="8px"
                    >
                      Email<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <Field
                      as={CustomTextField}
                      name="email"
                      label="Email"
                      isRequired={true}
                      fontSize="sm"
                      ms={{ base: "0px", md: "0px" }}
                      type="email"
                      placeholder="Enter your email address"
                      fontWeight="500"
                      size="lg"
                      onFocus={() => setNetworkError(null)}
                    />
                    <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                  </FormControl>

                  <FormControl
                    isInvalid={formik.errors.password && formik.touched.password}
                    mb="24px"
                  >
                    <FormLabel
                      ms="4px"
                      fontSize="sm"
                      fontWeight="500"
                      color={textColor}
                      display="flex"
                    >
                      Password<Text color={brandStars}>*</Text>
                    </FormLabel>
                    <InputGroup>
                      <Field
                        as={CustomTextField}
                        name="password"
                        fontSize="sm"
                        placeholder="Enter your password."
                        size="lg"
                        type={show ? "text" : "password"}
                        onFocus={() => setNetworkError(null)}
                      />
                      <InputRightElement display="flex" alignItems="center" mt="4px">
                        <Icon
                          color={textColorSecondary}
                          _hover={{ cursor: "pointer" }}
                          as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                          onClick={handleClick}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    {networkError !== null && (
                      <Text color="red" fontSize="sm">
                        {networkError || networkError?.message}
                      </Text>
                    )}
                  </FormControl>
                  <Flex justifyContent="space-between" align="center" mb="24px">
                    <FormControl display="flex" alignItems="center">
                      <Checkbox id="remember-login" colorScheme="brandScheme" me="10px" />
                      <FormLabel
                        htmlFor="remember-login"
                        mb="0"
                        fontWeight="normal"
                        color={textColor}
                        fontSize="sm"
                      >
                        Keep me logged in
                      </FormLabel>
                    </FormControl>
                    <NavLink to="/auth/forgot-password">
                      <Text color={textColorBrand} fontSize="sm" w="124px" fontWeight="500">
                        Forgot password?
                      </Text>
                    </NavLink>
                  </Flex>
                  <Button
                    type="submit"
                    fontSize="sm"
                    variant="brand"
                    fontWeight="500"
                    w="100%"
                    h="50"
                    mb="24px"
                    isLoading={formik.isSubmitting}
                  >
                    Sign In
                  </Button>
                </Form>
              )}
            </Formik>
            <Flex
              flexDirection="column"
              justifyContent="center"
              alignItems="start"
              maxW="100%"
              mt="0px"
            >
              <Text color={textColorDetails} fontWeight="400" fontSize="14px">
                Not registered yet?
                <NavLink to="/auth/sign-up">
                  <Text color={textColorBrand} as="span" ms="5px" fontWeight="500">
                    Create an Account
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </DefaultAuth>
  );
}

export default SignIn;
