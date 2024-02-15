import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  ButtonGroup,
  FormControl,

  FormLabel,
  HStack,
  Input,
  Progress,
  Stack,
  Text,
  useToast,
  VisuallyHidden,
} from "@chakra-ui/react";
import { signInWithGoogle, registerWithEmailAndPassword, setEmailInUse } from "../../features/Auth/authSlice";
import { GoogleIcon } from "./ProviderIcons";


export default function SignUp() {
    const toast = useToast();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error, emailInUse } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [EmailInuseLocal, setEmailInuseLocal] = useState(false);

  

  const handleSignInWithGoogle = () => {
    dispatch(signInWithGoogle());


    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 dispatch(registerWithEmailAndPassword({ email, password }));
  }
  

  useEffect(() => {
    if (emailInUse) {
      dispatch(setEmailInUse(true));
    }
  }, [emailInUse, dispatch]);


  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={{ base: "transparent", sm: "bg.surface" }}
      boxShadow={{ base: "none", sm: "md" }}
      borderRadius={{ base: "none", sm: "xl" }}
      mt={"30px"}
      bgColor={"white"}
      w={"600px"}
      h={"450px"}
      p={"3%"}
    >
      <form onSubmit={handleSubmit}>
        <FormControl>
          <FormLabel htmlFor="email"> Email {emailInUse  ? "The Email You Have Provided is in Use": ""}</FormLabel>
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
        </HStack>
        <Stack mt={"20px"} spacing="6">
          <Button type="submit">Sign Up</Button>
          <HStack>
            <Divider />
            <Text textStyle="sm" whiteSpace="nowrap" color="fg.muted">
              or continue with
            </Text>
            <Divider />
          </HStack>
        </Stack>
      </form>
      {isLoading && <Progress size="xs" isIndeterminate />}
      {error && console.log(error)}
      <HStack justify={"center"} align={"center"} mt={"10px"}>
        <ButtonGroup spacing="4">
          <Button key="Google" w={"100px"} onClick={handleSignInWithGoogle}>
            <VisuallyHidden>Sign in with Google</VisuallyHidden>
            <GoogleIcon />
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  );
}
