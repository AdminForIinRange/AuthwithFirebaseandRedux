import {
  Step,
  StepDescription,
  Input,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  HStack,
  Heading,
  InputGroup,
  Card,
  CardHeader,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Checkbox,
  CardBody,
  Highlight,
  Link,
  CardFooter,
  Divider,
  AspectRatio,
  ButtonGroup,
  Center,
  Flex,
  Button,
  Text,
  Stack,
  Box,
  useBreakpointValue,
  Menu,
  MenuButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  VStack,
  MenuList,
  MenuItem,
  Wrap,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Grid,
  GridItem,
  Image,
  InputLeftAddon,
  InputRightAddon,
  useSteps,
  AbsoluteCenter,
  Avatar,
  AvatarBadge,
  Progress,
  AvatarGroup,
  Container,
  VisuallyHidden,
  Spacer,
  Icon,
  TagLabel,
} from "@chakra-ui/react";

import { GoogleIcon } from "./ProviderIcons";
import { useState, useEffect, useDisclosure } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPassword,
  setForgotPassword,
  setinvalidCredential,
  setsignUp,
  signInWithGoogle,
} from "../../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
import { signInWithEmailPassword } from "../../features/Auth/authSlice";

import SignUp from "./SignUp";

export default function AuthConfig() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error, invalidCredential, signUp, forgotPassword } =
    useSelector((state) => state.auth);

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };
  const providers = [{ name: "Google", icon: <GoogleIcon /> }];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(signInWithEmailPassword({ email, password }));
  };

  const handelForgotPassword = () => {
    dispatch(resetPassword(email));
    console.log(resetPassword(email));
  };
  useEffect(() => {
    if (invalidCredential) {
      dispatch(setinvalidCredential(true)); // Set hasLoged to true when user is available
    }
  }, [invalidCredential]);

  useEffect(() => {
    if (user) {
      navigate("/home"); // Set hasLoged to true when user is available
    }
  }, [user]);

  return (
    <VStack w={"100%"} h={"100%"} justify={"center"} align={"center"} p={"1%"}>
      <VStack>
        <Text fontSize={"50px"}>🪵</Text>
        <Heading fontSize={"50px"}>
          {signUp ? <> Sign Up your account </> : <> Login to your account </>}
        </Heading>
        <Text fontSize={"20px"}>
          {signUp ? (
            <> Already have an account </>
          ) : (
            <> Dont have an Account </>
          )}
          <Button
            colorScheme="teal"
            variant="link"
            onClick={() => {
              dispatch(setsignUp());
            }}
          >
            <Link fontSize={"20px"}>
              {signUp ? <> Log In</> : <> Sign Up </>}
            </Link>
          </Button>
        </Text>
      </VStack>

      {signUp ? (
        <>
          <SignUp />
        </>
      ) : (
        <>
          <Box
            py={{
              base: "0",
              sm: "8",
            }}
            px={{
              base: "4",
              sm: "10",
            }}
            bg={{
              base: "transparent",
              sm: "bg.surface",
            }}
            boxShadow={{
              base: "none",
              sm: "md",
            }}
            borderRadius={{
              base: "none",
              sm: "xl",
            }}
            mt={"30px"}
            bgColor={"white"}
            w={"600px"}
            h={"100%"}
            p={"3%"}
          >
            <form onSubmit={handleSubmit}>
              {invalidCredential ? (
                <>
                  <Box
                    w={"100%"}
                    h={"30px"}
                    bg={"#FED7D7"}
                    mb={"15px"}
                    border={" 2px dotted #FC8181"}
                  >
                    <HStack justify={"center"}>
                      <Text fontWeight={450} color={"#9B2C2C"}>
                        Email or Password Incorrect try{" "}
                        <Button colorScheme="red" variant="link">
                          Forgot password?
                        </Button>{" "}
                        or{" "}
                        <Button colorScheme="orange" variant="link">
                          Sign Up
                        </Button>
                      </Text>
                    </HStack>
                  </Box>
                </>
              ) : (
                <></>
              )}
              <FormControl>
                <FormLabel htmlFor="email"> Email</FormLabel>
                <Input
                  id="email"
                  type="email"
                  w={"100%"}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl mt={"20px"}>
                <FormLabel htmlFor="password">password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  w={"100%"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <HStack mt={"10px"} justify="space-between">
                <Checkbox
                  defaultChecked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <Button
                  colorScheme="teal"
                  variant="link"
                  size="sm"
                  onClick={handelForgotPassword}
                >
                  Forgot password?
                </Button>
              </HStack>

              <Modal isOpen={forgotPassword}>
                <ModalOverlay />
                <ModalContent>
                  <VStack justify={"center"} align={"center"} p={"2%"} mb={"30px"}>

                                      
                  <Text fontWeight={500} fontSize={"30px"} >🪵</Text>


                    <Text fontWeight={500} fontSize={"20px"} >Password Change Request</Text>

                    <Text>You have sumbited a password change request</Text>
                    <Divider  w={"60%"} />
                    <Text>We Have emailed a Rest Link to: </Text>
                    <Text fontSize={"20px"} color={"teal"} >{email}</Text>
                  </VStack>

                  <ModalCloseButton  onClick={()=>{dispatch(setForgotPassword(false))}}/>
                 

                 
                </ModalContent>
              </Modal>

              <Stack mt={"20px"} spacing="6">
                {isLoading && (
                  <Progress p={"0px"} m={"0px"} size="xs" isIndeterminate />
                )}
                <Button type="submit">Sign in</Button>

                <HStack>
                  <Divider />
                  <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
                    or continue with
                  </Text>
                  <Divider />
                </HStack>
              </Stack>
            </form>

            {/* 
Create its own Comp as with everything else here */}

            <HStack justify={"center"} align={"center"} mt={"10px"}>
              <ButtonGroup spacing="4">
                {providers.map(({ name, icon }) => (
                  <Button
                    key={name}
                    w={"100px"}
                    onClick={handleSignInWithGoogle}
                  >
                    <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                    {icon}
                  </Button>
                ))}
              </ButtonGroup>
            </HStack>
          </Box>
        </>
      )}
    </VStack>
  );
}
