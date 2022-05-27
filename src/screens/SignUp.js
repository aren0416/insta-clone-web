import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BottomBox } from "../components/auth/BottomBox";
import { Button } from "../components/auth/Button";
import { FormBox } from "../components/auth/FormBox";
import { Input } from "../components/auth/Input";
import { Separator } from "../components/auth/Separator";
import { PageTitle } from "../components/PageTitle";
import { FatLInk } from "../components/shared";
import { FormError } from "../components/auth/FormError";
import { routes } from "../routes";

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Subtitle = styled(FatLInk)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

export const SignUp = () => {
  const navigate = useNavigate();

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return;
    }
    navigate(routes.home);
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    // const { firstName, lastName, email, username, password } = data;
    createAccount({
      variables: {
        ...data,
      },
    });
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>
            Sign up to see photos and videos from your friends.
          </Subtitle>
        </HeaderContainer>
        <Separator />
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("firstName", {
              required: "이름은 필수에요",
            })}
            type="text"
            placeholder="First Name"
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            {...register("lastName")}
            type="text"
            placeholder="Last Name"
          />
          <Input
            {...register("email", {
              required: "이메일은 필수에요",
            })}
            type="text"
            placeholder="Email"
          />
          <FormError message={errors?.email?.message} />
          <Input
            {...register("username", {
              required: "아이디는 필수에요",
            })}
            type="text"
            placeholder="Username"
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "비밀번호 필수에요",
            })}
            type="password"
            placeholder="Password"
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading.." : "Sign up"}
            disabled={!isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};
