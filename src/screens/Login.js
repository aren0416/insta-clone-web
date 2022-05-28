import { gql, useMutation } from "@apollo/client";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BottomBox } from "../components/auth/BottomBox";
import { Button } from "../components/auth/Button";
import { FormBox } from "../components/auth/FormBox";
import { FormError } from "../components/auth/FormError";
import { Input } from "../components/auth/Input";
import { Separator } from "../components/auth/Separator";
import { PageTitle } from "../components/PageTitle";
import { routes } from "../routes";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

export const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });

  const onCompleted = (data) => {
    // console.log(data);
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      // console.log(token);
      logUserIn(token);
      navigate(routes.home, { replace: true });
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors("result");
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            {...register("username", {
              required: "아이디는 필수에요",
              minLength: {
                value: 5,
                message: "아이디는 5글자보다 길어야해요",
              },
              onChange() {
                clearErrors("result");
              },
            })}
            // onFocus={clearLoginError}
            type="text"
            placeholder="Username"
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            {...register("password", {
              required: "비밀번호는 필수에요",
              minLength: {
                value: 8,
                message: "비밀번호는 8글자보다 길어야해요",
              },
            })}
            onFocus={clearLoginError}
            type="password"
            placeholder="Password"
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <Button
            type="submit"
            value={loading ? "Loading.." : "Log In"}
            disabled={!isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
};
