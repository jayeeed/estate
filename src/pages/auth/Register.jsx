import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  IconButton,
  OutlinedInput,
  InputLabel,
  InputAdornment,
  FormControl,
  TextField,
  Divider,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";

import googleLogo from "../../assets/images/google-logo.png";
import assets from "../../assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  clearMessage,
  registerUser,
  socialLoginSignup,
} from "../../redux/features/AuthSlice";
import { BeatLoader } from "react-spinners";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { error, success } = useSelector((state) => state.auth);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const userSchema = Yup.object({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(40, "Too Long!")
      .required("Name is required"),
    email: Yup.string()
      .email("Email must be a valid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must have at least 6 characters"),
    // .matches(/[0-9]/, "Must have a number")
    // .matches(/[a-z]/, "Must have at least one lowercase")
    // .matches(/[A-Z]/, "Must have at least one uppercase")
    // .matches(/[!@#%^&*]/, "Must have at least one special character")
    confirmPassword: Yup.string()
      .required("Must have a confirm password")
      .oneOf([Yup.ref("password"), null], "Password does not match"),
  });

  const {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userSchema,

    onSubmit: async (values, action) => {
      try {
        setSubmitting(true);
        // Dispatch the login action
        const response = await dispatch(
          registerUser({
            name: values.name,
            email: values.email,
            password: values.password,
          })
        );

        if (response.payload.status) {
          navigate("/login");
          action.resetForm();
        }
        setSubmitting(false);
      } catch (error) {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
    if (success) {
      toast.success(success);
      navigate("/");
      dispatch(clearMessage());
    }
  }, [error, success, dispatch, navigate]);

  const handleClickShowPassword = (field) => {
    if (field === "password") {
      setShowPassword((show) => !show);
    } else if (field === "confirmPassword") {
      setShowConfirmPassword((show) => !show);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //     dispatch(clearMessage());
  //   }
  //   if (success) {
  //     toast.success(success);
  //     navigate("/");
  //     dispatch(clearMessage());
  //   }
  // }, [error, success]);

  /// social login
  // const login = useGoogleLogin({
  //   onSuccess: (tokenResponse) => {
  //     const accessToken = tokenResponse.access_token; // Extract the access token from the response

  //     axios
  //       .get("https://www.googleapis.com/userinfo/v2/me", {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //         },
  //       })
  //       .then((response) => {
  //         const loginData = response.data;
  //         dispatch(socialLoginSignup(loginData));
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user info:", error);
  //       });
  //   },
  // });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor={"#e7e7e7"}
    >
      <Box p={4}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100%"
            >
              <Box p={2}>
                <Link to={"/"}>
                  <img
                    src={assets.images.logo}
                    alt="Airbnb Logo"
                    style={{
                      height: "80px",
                      cursor: "pointer",
                      border: "1px solid #f3f3f3",
                    }}
                  />
                </Link>
                <Box p={2}></Box>
                <p>Explore the ideas throughtout the world</p>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box
              boxShadow={"0px 0px 18px 0px #6363633b"}
              p={4}
              textAlign={"center"}
              xs={{
                width: "100%",
              }}
              borderRadius={"20px"}
              bgcolor={"#fff"}
            >
              <h3>Sign up</h3>
              <div style={{ textAlign: "left", width: "100%" }}>
                <h4>Welcome ! 👋🏻</h4>
                <p>Please sign-up to your account and start the adventure</p>
              </div>
              <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Box pt={5}>
                  <TextField
                    type="text"
                    label="Name"
                    fullWidth
                    name="name"
                    error={errors.name && touched.name ? errors : null}
                    autoComplete="current-name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name ? (
                    <p
                      style={{
                        color: "#d32f2f",
                        textAlign: "left",
                        margin: 0,
                        fontSize: "13px",
                        paddingTop: "10px",
                      }}
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </Box>
                <Box pt={3}>
                  <TextField
                    type="email"
                    label="Email"
                    fullWidth
                    name="email"
                    error={errors.email && touched.email ? errors : null}
                    autoComplete="current-email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email ? (
                    <p
                      style={{
                        color: "#d32f2f",
                        textAlign: "left",
                        margin: 0,
                        fontSize: "13px",
                        paddingTop: "10px",
                      }}
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </Box>
                {/* <Box pt={3}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel htmlFor="user-role">User Role</InputLabel>
                    <Select
                      id="user-role"
                      name="userRole"
                      error={errors.userRole && touched.userRole ? true : false}
                      value={values.userRole}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      label="User Role"
                    >
                      <MenuItem value="renter">Renter</MenuItem>
                      <MenuItem value="host">Host</MenuItem>
                    </Select>
                  </FormControl>
                </Box> */}
                <Box pt={3}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      error={!!errors.password && touched.password} // Set error prop based on error condition
                      name="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => handleClickShowPassword("password")}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                  </FormControl>
                  {errors.password && touched.password && (
                    <p
                      style={{
                        color: "#d32f2f",
                        textAlign: "left",
                        margin: 0,
                        fontSize: "13px",
                        paddingTop: "10px",
                      }}
                    >
                      {errors.password}
                    </p>
                  )}
                </Box>
                <Box pt={3}>
                  <FormControl sx={{ width: "100%" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm Password
                    </InputLabel>
                    <OutlinedInput
                      error={
                        !!errors.confirmPassword && touched.confirmPassword
                      }
                      name="confirmPassword"
                      autoComplete="current-password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type={showConfirmPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() =>
                              handleClickShowPassword("confirmPassword")
                            }
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm Password"
                    />
                  </FormControl>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <p
                      style={{
                        color: "#d32f2f",
                        textAlign: "left",
                        margin: 0,
                        fontSize: "13px",
                        paddingTop: "10px",
                      }}
                    >
                      {errors.confirmPassword}
                    </p>
                  )}
                </Box>
                <Box pt={2}>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ textTransform: "capitalize" }}
                  >
                    {isSubmitting ? <BeatLoader color="#ff0000" /> : "Resigter"}
                  </Button>
                </Box>
                <Box sx={{ position: "relative", my: 3, textAlign: "center" }}>
                  <Divider />
                  <p
                    style={{
                      position: "absolute",
                      top: "-13px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      background: "#fafcfe",
                      padding: "0px 11px",
                      margin: 0,
                      borderRadius: "10px",
                      border: "1px solid #0000001f",
                    }}
                  >
                    or
                  </p>
                </Box>
              </form>

              {/* <Box
                my={2}
                bgcolor={"white"}
                p={1}
                border={"1px solid #0000001f"}
                borderRadius={1}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                onClick={() => login()}
                sx={{ cursor: "pointer" }}
              >
                <img src={googleLogo} height={"18px"} alt="" />
                <Typography variant="text" sx={{ ml: 1 }} fontSize={"14px"}>
                  Sing up with google
                </Typography>
              </Box> */}
              <Box pt={2} display="flex" alignItems="center">
                If you have already an account ?
                <Link to="/login">
                  <Typography
                    style={{ textDecoration: "underline" }}
                    variant="body2"
                  >
                    Sign in
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer position="top-right" autoClose={3000} />
    </Box>
  );
};

export default RegisterScreen;
