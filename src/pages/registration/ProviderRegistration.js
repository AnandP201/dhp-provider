import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Grid from '@mui/material/Unstable_Grid2'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useNavigate  } from 'react-router-dom'
import axios from 'axios'

const ProviderRegistration = (props) => {
  const location = useLocation()
  const [email, setEmail] = useState(location.state.email)
  const [firstName, setFirstName] = useState(location.state.firstName)
  const [middleName, setMiddleName] = useState(location.state.middleName)
  const [lastName, setLastName] = useState(location.state.lastName)
  const [validationError, setValidationError] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const iamId = location.state.id
  const navigate = useNavigate ()
  const vertical = 'top'
  const horizontal = 'center'

  const validate = async () => {
    return !email || !firstName || !lastName
  }

  const handleVallidationClose = (event, reason)  => {
    if (reason === 'clickaway') {
      return
    }
    setValidationError(false)
  }

  const handleSaveSuccess = (event, reason)  => {
    if (reason === 'clickaway') {
      return
    }
    setSaveSuccess(false)
    navigate('/dashboard')
  }

  const handleSubmit = async () => {
    const validationError = await validate()
    setValidationError(validationError)
    if (!validationError) {
      axios({
        method: "POST",
        url: 'http://localhost:4000/users',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          middleName: middleName,
          iamId: iamId
        }
      })
      .then( (res) => {
        // TODO - Feedback
        setSaveSuccess(true)
      })
    }
    else {

    }
  }

  return (
    <Box mt={2} ml={2} mr={2} mb={2}>
      <Snackbar  anchorOrigin={{vertical, horizontal}} open={validationError} autoHideDuration={3000} onClose={handleVallidationClose}>
        <Alert onClose={handleVallidationClose} severity="error" sx={{ width: '100%' }}>
          Please fill all the fields!
        </Alert>
      </Snackbar>
      <Snackbar  anchorOrigin={{vertical, horizontal}} open={saveSuccess} autoHideDuration={3000} onClose={handleSaveSuccess}>
        <Alert onClose={handleSaveSuccess} severity="success" sx={{ width: '100%' }}>
          Saved Successfully!
        </Alert>
      </Snackbar>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid>
            <h1> Provider Registration </h1>
        </Grid>
      </Grid>
      <Divider />
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
             style = {{width: '95%'}}
             required
             id="email"
             label="Email"
             value={email}
             variant="standard"
             onChange={ (event) => {setEmail(event.target.value)}}
           />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
             style = {{width: '95%'}}
             required
             id="firstName"
             label="First Name"
             value={firstName}
             variant="standard"
             onChange={ (event) => {setFirstName(event.target.value)}}
           />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
             style = {{width: '95%'}}
             id="middleName"
             label="Middle Name"
             value={middleName}
             variant="standard"
             onChange={ (event) => {setMiddleName(event.target.value)}}
           />
        </Grid>
        <Grid xs={12} sm={6} md={6} lg={6} mt={1}>
          <TextField
             style = {{width: '95%'}}
             required
             id="lastName"
             label="Last Name"
             value={lastName}
             variant="standard"
             onChange={ (event) => {setLastName(event.target.value)}}
           />
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <Grid sx={{marginRight: '2.5%'}} mt={2}>
          <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProviderRegistration
