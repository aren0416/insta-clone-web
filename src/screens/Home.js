export const Home = ({ setIsLoggedIn }) => {
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => setIsLoggedIn(true)}>Log out now!</button>
    </div>
  );
};
