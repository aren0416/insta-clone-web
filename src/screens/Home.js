import { logUserOut } from "../apollo";

export const Home = () => {
  return (
    <div>
      <h1>Welcom we did it!!</h1>
      <button onClick={() => logUserOut()}>Log out now!</button>
    </div>
  );
};
