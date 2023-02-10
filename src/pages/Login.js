import Button from "@mui/material/Button";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("access_token");
    const userName = searchParams.get("name");
    const userProfileExists = searchParams.get("user_profile_exists");
    const email = searchParams.get("email");
    const id = searchParams.get("id");
    if (token) {
      // To be fixed later.
      props.loginSuccess(
        token,
        {
          userProfileExists: userProfileExists,
          userName: userName,
          email: email,
          id: id,
        },
        "ROLE_USER"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      {
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <Grid>
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              width="150"
              alt="Github Logo"
            ></img>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              href="http://localhost:4000/oauth/authorize?source=pivot_portal&provider=github"
            >
              Log In
            </Button>
          </Grid>
          <div>
            <Link to="/Registration" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                href="http://localhost:3000/Registration"
                sx={{
                  textDecoration: "null",
                  marginTop: 2,
                }}
              >
                Sign up
              </Button>
            </Link>
          </div>
        </Grid>
      }
    </React.Fragment>
  );
};

export default Login;
