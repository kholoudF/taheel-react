/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import localContext from '../../../localContext';
import DashboardNavbar from '../../../components/DashboardNavbar';
import MainNavbar from '../../../components/MainNavbar';
import {
  CardContent,
  Box,
  Container,
  Grid,
  Link,
  Alert,
  Typography,
} from '@material-ui/core';
import LoginRequest from './data/LoginApi';
import { AuthOTPPhoneNum, requestOTPPhoneNum } from 'src/pages/UserAuthentication/Registration/services/RegistrationAPI';
import LoginOtp from './components/LoginOtp';
import FinalFromWizard from 'src/components/wizard/FinalFormWizard';
import CredentialInfo from './components/CredentialInfo';
import { CredentialValidation, smsOtpValidate } from './LoginUtils';
import { setCurrentUser } from 'src/utils/UserLocalStorage';
import LoginFinalFromWizard from './components/LoginFinalFromWizard';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(38),
    height: theme.spacing(38),
  },

  avatarHover: {
    "&:hover": {
      backgroundColor: '#f6a923',
      border: 'solid 5px #f6a923'
    }
  },

  secondaryButton: {
    "&:hover": {
      color: 'white'
    }
  }
}));

const Login = () => {
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { users, setUser } = useContext(localContext);
  const [errMessage, SetErrMessage] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('center');
  const [userType, setUserType] = useState("1");
  const [phone, setPhone] = useState('');
  const [iqamaId, setIqamaId] = useState('');
  const [otp, setOtp] = useState('');

  const classes = useStyles();
  const [avtarColor, setColor] = useState({
    // rightAvatar: '#c8d9d9',
    // leftAvatar: '#c8d9d9',
    beneficiaryAvatar: '#c8d9d9',
    centerAvatar: '#214256',
    employeeAvatar: '#c8d9d9',
  });
  const validateLoginReq = async (values) => {
    const { email, password } = values;
    console.log('dataaaaaaaaaaaaaa', email, password);
    const LoginReq = await LoginRequest(email, password, userType);
    if (!LoginReq.isSuccessful) {
      return { isSuccessful: false, message: LoginReq.message };
    }
    setPhone(LoginReq.responseBody.data.phoneNumber);
    setIqamaId(LoginReq.responseBody.data.idNumIqamaNum);
    if (LoginReq.isSuccessful) {
      const sendSmsRs = await requestOTPPhoneNum(LoginReq.responseBody.data.idNumIqamaNum, LoginReq.responseBody.data.phoneNumber);
      const otp = sendSmsRs.responseBody.data.OTP;
      setOtp(otp);
      setUser(LoginReq.responseBody.data)
      if (!sendSmsRs.isSuccessful) {
        // SetErrMessage(sendSmsRs.message);
        return { isSuccessful: false, message: sendSmsRs.message };
      }
    }
    return LoginReq;
  };

  const onSubmit = async (values) => {
    // if (values.verificationCode == otp || values.verificationCode == '000000') {
    console.log("++++++++2+++++", phone, iqamaId);

    const OTPAuth = await AuthOTPPhoneNum(phone, iqamaId, values.verificationCode);
    if (!OTPAuth.isSuccessful) {
      SetErrMessage(OTPAuth.message);
      return { isSuccessful: false, message: OTPAuth.message };
    }
    setCurrentUser(users);
    navigate('/app/dashboard', { replace: true }, { state: { selectedAvatar, userType } });
    // }
    return true;
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <DashboardNavbar onMobileNavOpen={() => setMobileNavOpen(true)} />
      <MainNavbar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <Box
        sx={{
          backgroundColor: '#fafafa',
          width: '100%',
          height: "100%",
          backgroundSize: "cover"
        }}
      >
        <Container maxWidth="sm">
          <Box sx={{
            mt: '2%',
            backgroundColor: 'white',
            borderRadius: 5,
            paddingRight: 3,
            paddingLeft: 3,
            boxShadow: '5px 10px 18px #ecf1f5'
          }}>
            <Grid
              container
            >
              <Grid
                item
                xs={12}
                md={12}
              >
                <Box
                  className={classes.root}
                  sx={{ mb: 5, mr: 1.5 }}
                >
                  <Grid container spacing={3} sx={{ margin: "0 auto", width: "auto" }}>
                    <Grid item xs={4}>
                      <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        onClick={() => {
                          setUserType("2");
                          setSelectedAvatar('beneficiary'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#214256', centerAvatar: '#c8d9d9', employeeAvatar: '#c8d9d9' })
                        }
                        }
                        sx={{
                          height: '85px', width: '85px', backgroundColor: avtarColor.beneficiaryAvatar, cursor: "pointer"
                        }}
                      >
                        أفراد
                      </Avatar>
                    </Grid>
                    <Grid item xs={4}>
                      <Avatar
                        className={classes.large + ' ' + classes.avatarHover}
                        onClick={() => {
                          setUserType("1");
                          setSelectedAvatar('center'),
                            setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#214256', employeeAvatar: '#c8d9d9' })
                        }}

                        sx={{
                          height: '85px', width: '85px', backgroundColor: avtarColor.centerAvatar, cursor: "pointer"
                        }}
                      >
                        مركز
                      </Avatar>
                    </Grid>
                    <Grid item xs={4}>
                      <a href="https://inspiredemo2.appiancloud.com/suite/sites/takamol-taheel/page/request-Records" target="_blank">
                        <Avatar
                          className={classes.large + ' ' + classes.avatarHover}
                          onClick={() => {
                            setUserType("1");
                            setSelectedAvatar('employee'),
                              setColor({ ...avtarColor, beneficiaryAvatar: '#c8d9d9', centerAvatar: '#c8d9d9', employeeAvatar: '#214256' })
                          }}
                          sx={{
                            height: '85px', width: '85px', backgroundColor: avtarColor.employeeAvatar, cursor: "pointer"
                          }}
                        >
                          موظف
                        </Avatar>
                      </a>
                    </Grid>
                  </Grid>
                </Box>
                <Box sx={{ mb: 3, textAlign: 'center' }}>
                  {selectedAvatar === "beneficiary" && (
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      تسجيل دخول المستفيد
                    </Typography>

                  )
                  }
                  {selectedAvatar === "center" && (
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      تسجيل دخول المركز
                    </Typography>

                  )
                  }
                  {selectedAvatar === "employee" && (
                    <Typography
                      color="textPrimary"
                      variant="h2"
                    >
                      تسجيل دخول الموظف
                    </Typography>
                  )
                  }
                </Box>
              </Grid>
            </Grid>
            <CardContent sx={{ padding: "0px" }}>
              {errMessage && (
                <Alert variant="outlined" severity="error">
                  {errMessage}
                </Alert>
              )}
              <LoginFinalFromWizard // pass initialValues, onSubmit and 4 childrens
                initialValues={{
                  disabledBackButt: false,
                  lastPageErrorHandling: false,
                  agree: [false],
                  isTaheelValidate: false,

                }}
                phone={phone}
              iqamaId= {iqamaId}
              onSubmit={onSubmit}
              >
              <LoginFinalFromWizard.Page
                label=""
                validate={CredentialValidation}
                nextFun={(values) => validateLoginReq(values)}
              >
                <CredentialInfo
                />
              </LoginFinalFromWizard.Page>
              <LoginFinalFromWizard.Page
                validate={smsOtpValidate}
                label=""
                phone={phone}
                iqamaId={iqamaId}
              >
                <LoginOtp
                />
              </LoginFinalFromWizard.Page>
              </LoginFinalFromWizard>
            </CardContent>
          <Box
            textAlign="center"
            sx={{
              py: 2,
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
          </Box>
          </Box>
        </Container >
    </Box >
    </>
  );
};

export default Login;



