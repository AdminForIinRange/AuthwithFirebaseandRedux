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
import { useDispatch, useSelector } from "react-redux";
import { setsignUp } from "../features/Auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function LoginHeading({ signUp }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <VStack>
      <Text fontSize={"50px"}>🪵</Text>
      <Heading
        fontSize={{
          base: "30px",
          xsm: "30px",
          ssm: "30px",
          sm: "50px",
          md: "50px",
          lg: "50px",
          xl: "50px",
          xxl: "50px",
          xxxl: "50px",
        }}
      >
        {signUp ? <> Sign Up your account </> : <> Login to your account </>}
      </Heading>
      <Text fontSize={"20px"}>
        {signUp ? <> Already have an account </> : <> Dont have an Account </>}
        <Button
          colorScheme="teal"
          variant="link"
          onClick={() => {
            dispatch(setsignUp());
            navigate("/");
          }}
        >
          <Link
            fontSize={{
              base: "17px",
              xsm: "17px",
              ssm: "17px",
              sm: "17px",
              md: "17px",
              lg: "17px",
              xl: "17px",
              xxl: "25px",
              xxxl: "20px",
            }}
          >
            {signUp ? <> Log In</> : <> Sign Up </>}
          </Link>
        </Button>
      </Text>
    </VStack>
  );
}
