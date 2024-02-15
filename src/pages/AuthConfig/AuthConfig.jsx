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

import { GitHubIcon, GoogleIcon, TwitterIcon } from "./ProviderIcons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogle } from "../../features/Auth/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { signInWithEmailPassword } from "../../features/Auth/authSlice";
import { registerWithEmailAndPassword } from "../../features/Auth/authSlice";
import SignUp from "./SignUp";

export default function AuthConfig() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };
  const providers = [{ name: "Google", icon: <GoogleIcon /> }];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [signUp, setSignUp] = useState(false)



  const handleSubmit = async (e) => {
    e.preventDefault();
   
    dispatch(signInWithEmailPassword({ email, password }));
    
   
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(registerWithEmailAndPassword({ email, password }));
  // };

  useEffect(() => {
    if (user) {
     
      
      navigate("/home"); // Set hasLoged to true when user is available
    }
  }, [user]);

  return (
    <VStack w={"100%"} h={"100%"} justify={"center"} align={"center"} p={"1%"}>
      <VStack>
        <Text fontSize={"50px"}>🪵</Text>
        <Heading fontSize={"50px"}>{ signUp ? <> Sign Up your account </> :  <> Login to your account </> }</Heading>
        <Text fontSize={"20px"}>
        { signUp ? <> Already have an account </> :  <> Dont have an Account </> }
          <Button  colorScheme="teal" variant="link" onClick={()=>{
            setSignUp((prev)=> !prev)
          }}>
            <Link  fontSize={"20px"} >{ signUp ? <> Log In</> :  <> Sign Up </> }</Link>
          </Button>
        </Text>
      </VStack>


      {
        signUp? <>

        <SignUp />




        </> : <>
        
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
        h={"450px"}
        p={"3%"}
      >
        <form onSubmit={handleSubmit}>
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
            <Button colorScheme="teal" variant="link" size="sm">
              Forgot password?
            </Button>
          </HStack>

          <Stack mt={"20px"} spacing="6">
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

        {isLoading &&  <Progress size='xs' isIndeterminate />}
        {error && console.log(error)}
    
          <HStack justify={"center"} align={"center"} mt={"10px"}>
            <ButtonGroup spacing="4">
              {providers.map(({ name, icon }) => (
                <Button key={name} w={"100px"} onClick={handleSignInWithGoogle}>
                  <VisuallyHidden>Sign in with {name}</VisuallyHidden>
                  {icon}
                </Button>
              ))}
            </ButtonGroup>
          </HStack>
        
      </Box>
        </>
      }
    </VStack>
  );
}
