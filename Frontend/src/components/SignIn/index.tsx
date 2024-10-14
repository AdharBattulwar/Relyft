import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardBackspace } from "react-icons/md";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import googleAuth from "../AuthProviders/google";
import githubAuth from "../AuthProviders/github";
import facebookAuth from "../AuthProviders/facebook";
import { Oval } from "react-loader-spinner";

type Props = object;

const Signin: React.FC<Props> = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(Promise.resolve({}));

  useEffect(() => {
    userInfo
      .then((res: any) => {
        console.log(res.user);
        if (res.user) {
          const userdata = {
            email: res.user.email,
          };
          console.log(userdata);
          if (userdata) {
            axios
              .post(
                `${SERVER_URL}/api/v1/user/signin/google`,
                userdata,
                {
                  withCredentials: true,
                }
              )
              .then((res) => {
                console.log(res);
                // TODO : Set Link And add Cookie to the browser for SignUp
                if (res.data.success === true) {
                  navigate("/dashboard/home");
                } else {
                  console.log("error");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userInfo]);

  const handleSignin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const userdata = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await axios
      .post(`${SERVER_URL}/api/v1/user/signin`, userdata, {
        withCredentials: true,
      })
      .then((res) => {
        setLoading(false);
        console.log("success");
        console.log(res);
        if (res.data.success === true) {
          navigate("/dashboard/home");
        } else {
          console.log("error");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div className="px-5 py-6 flex flex-col gap-10 h-screen w-screen">
      <div className="absolute top-7 left-7">
        <Button className="p-2 rounded-full bg-[#F2F2F2]">
          <MdKeyboardBackspace className="text-xl " />
        </Button>
      </div>
      <div className="flex flex-col justify-center gap-4 items-center mt-12">
        <div className="text-2xl font-bold">Sign In</div>
        <div className="line-clamp-2 px-4 text-sm text-[#A5A5A5] ">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
          voluptatem, nemo, amet quod eligendi rerum quos quis aperiam optio
          velit saepe quia tenetur ipsum esse dolor exercitationem repellendus
          beatae distinctio?
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <form onSubmit={handleSignin}>
          <div className="flex flex-col gap-4">
            <Input
              className="text-base font-medium"
              Icon={<HiOutlineMail />}
              type="email"
              name="email"
              required
              placeholder="Enter Your Email"
            />
            <Input
              className="text-base font-medium"
              Icon={<RiLockPasswordFill />}
              type="password"
              name="password"
              required
              placeholder="Enter Your Password"
            />
          </div>
          <Link to={"/forgot"}>
            <div className="flex items-center text-sm mt-4 underline text-myGreen font-medium justify-end">
              Forgot Password
            </div>
          </Link>
          <div className="flex mt-12">
            <Button className="bg-[#46C96B] text-base mx-3 w-full text-white font-semibold rounded-xl py-4 ">
              {loading ? (
                <div
                  className="flex
                 items-center justify-center gap-4"
                >
                  <Oval
                    visible={true}
                    height="20"
                    width="40"
                    color="#fff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                  Sign In
                </div>
              ) : (
                "Sign In"
              )}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="text-[#A5A5A5] text-sm">Or Sign In With</div>
        <div className="flex gap-4 items-center justify-center">
          <Button
            onClick={() => setUserInfo(googleAuth)}
            className="p-4 bg-[#f2f2f2] rounded-xl "
          >
            <FcGoogle className="text-2xl" />
          </Button>
          <Button onClick={githubAuth} className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaGithub className="text-2xl text-gray-600" />
          </Button>
          <Button className="p-4 bg-[#f2f2f2] rounded-xl ">
            <FaFacebook
              onClick={facebookAuth}
              className="text-2xl text-blue-500"
            />
          </Button>
        </div>
      </div>
      <div className="mt-6 items-end flex-grow mb-12 flex text-sm font-medium gap-1 justify-center">
        Don't Have an Account ?
        <Link to={"/"} className="text-[#46C96B]">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Signin;
