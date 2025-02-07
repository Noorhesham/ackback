import React, { useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { postApi, ValidationErrorInterface } from "../libs/api";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userLoggedState } from '../data/userLoggedState';
import { setLocalStorage } from "../libs/localstorage";
import { checkCacheData } from '../data/global/Function';
import { alertTimer } from '../components/Settings/Sweetalert/Sweetalert';

export const credentialCookieName = 'credential';
const SignIn = () => {
  const { t } = useTranslation();
  const [err, setError] = useState("");
  const [data, setData] = useState<{
    username?: string, password?: string, subscription_id?: string
  }>({
  })
  const { username, password, subscription_id } = data;
  const changeHandler = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value })
    setError("");
  }

  const [, setUserLoggedState] = useRecoilState(userLoggedState); // تعريف الستيت وانشائه اول مرة


  let navigate = useNavigate();
  const routeChange = () => {
    let path = `${process.env.PUBLIC_URL}/app`;
    navigate(path);
  }


  const Login = (e: any) => {

    const errorMessages: ValidationErrorInterface[] = [];
    // Check fields in modal
    if (!subscription_id) {
      errorMessages.push({ field: 'subscription_id', message: t('validation.errorMessages.The Field Is Required') });
    }
    if (!username) {
      errorMessages.push({ field: 'username', message: t('validation.errorMessages.The Field Is Required') });
    }
    if (!password) {
      errorMessages.push({ field: 'password', message: t('validation.errorMessages.The Field Is Required') });
    }
    const firstError = errorMessages.find(message => message !== null);

    if (!firstError) {


      e.preventDefault();
      postApi("/api/v1/auths/login", {
        subscription_id: subscription_id,
        username: username,
        password: password
      }).then(
        r => {
          setLocalStorage(credentialCookieName, JSON.stringify(r));
          checkCacheData(false).finally(() => {
            setUserLoggedState(r); // Update the Recoil setUserLoggedState state  by adding a object
            routeChange();
          })

        }
      ).catch(error => {
        
        const apiError = (error.response?.data?.message || error.message );
        console.log('api error' , apiError);
        const errorMessage = t(`login.${apiError}` );
        
        setError(errorMessage);
      });
    } else {
      alertTimer({ title: 'Error', body: firstError.message, icon: 'warning', showConfirmButton: false, position: "top-start" });

      const firstErrorField = document.querySelector(`body [name="${firstError.field}"]`); // this to add auto focus 
      if (firstErrorField) {
        (firstErrorField as HTMLInputElement).focus();
      }
    }
  }

  const userLogged = useRecoilValue(userLoggedState);


  return userLogged ? ( // this tp prevent page flash before redirecting
    // User is authenticated, redirecting...
    null
  ) : (
    <React.Fragment>
      <div className="square-box"> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
      <div className="page bg-primary">
        <div className="page-single">
          <div className="container" style={{ marginTop: "89px" }} >
            <Row>
              <Col
                xl={5}
                lg={6}
                md={8}
                sm={8}
                xs={10}
                className="card-sigin-main mx-auto my-auto py-4 justify-content-center"
              >
                <div className="card-sigin">
                  {/* <!-- Demo content--> */}
                  <div className="main-card-signin d-md-flex">
                    <div className="wd-100p">
                      <div className="d-flex mb-4">
                        <Link to="#">
                          <img
                            src={require("../assets/img/brand/favicon.png")}
                            className="sign-favicon ht-40"
                            alt="logo"
                          />
                        </Link>
                      </div>
                      <div className="">
                        <div className="main-signup-header">
                          <h2>{t('greeting')}!</h2>
                          <div className="panel panel-primary">
                            <div className=" tab-menu-heading mb-2 border-bottom-0">
                              <div className="tabs-menu1">
                                {err && <Alert variant="danger">{err}</Alert>}
                                <Form >
                                  <Form.Group className="form-group">
                                    <Form.Label className=''>{t("login.Subscription Id")}</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="رقم الاشتراك"
                                      data-focusable="true"
                                      name="subscription_id"
                                      type='text'
                                      value={subscription_id}
                                      onChange={changeHandler}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label className=''>{t("login.Username")}</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="اسم المستخدم"
                                      data-focusable="true"
                                      name="username"
                                      type='text'
                                      value={username}
                                      onChange={changeHandler}
                                      required
                                    />
                                  </Form.Group>
                                  <Form.Group className="form-group">
                                    <Form.Label>{t("login.Password")}</Form.Label>{" "}
                                    <Form.Control
                                      className="form-control"
                                      placeholder="كلمة المرور"
                                      data-focusable="true"
                                      name="password"
                                      type='password'
                                      value={password}
                                      onChange={changeHandler}
                                      required
                                    />
                                  </Form.Group>
                                  <Button
                                    variant=""
                                    type='submit'
                                    className="btn btn-primary btn-block"
                                    data-focusable="true"
                                    onClick={Login}
                                  >
                                    {t("login.Sign in")}
                                  </Button>
                                </Form>
                              </div>
                            </div>


                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div >
      </div>
    </React.Fragment>
  );
}

SignIn.propTypes = {};

SignIn.defaultProps = {};

export default SignIn;
