import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { AuthLayout } from "../components/auth/AuthLayout";
import { BottomBox } from "../components/auth/BottomBox";
import { Button } from "../components/auth/Button";
import { FormBox } from "../components/auth/FormBox";
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

export const Login = () => {
  const { register, watch, handleSubmit } = useForm();
  const onSubmitValid = (data) => {
    console.log(data);
  };

  const onSubmitInvalid = (data) => {
    console.log(data);
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmitValid, onSubmitInvalid)}>
          <Input
            {...register("username", {
              required: "아이디는 필수에요",
              minLength: {
                value: 3,
              },
            })}
            type="text"
            placeholder="Username"
          />
          <Input
            {...register("password", {
              required: "비밀번호는 필수에요",
            })}
            type="password"
            placeholder="Password"
          />
          <Button type="submit" value="Log in" />
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
