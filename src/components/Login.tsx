import axios from "@/api/axios";
import { useAuth } from "@/context/AuthProvider";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { PageProvider } from "@/context/PageProvider";
import DynamicForm from "./forms/DynamicForm";
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Password must be at least 3 characters" }),
});

const loginArray = [
  {
    name: "email",
    label: "Email",
    placeholder: "Add Your Email...",
    description: "We'll never share your email.",
    id: "title-2",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Add Your Password...",
    description: "We'll never share your password.",
    id: "title-3",
  },
];
const Login = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { setAuth, auth } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      axios
        .post(
          "/auth/login",
          {
            email: data.email,
            password: data.password,
          },
          { withCredentials: true }
        )
        .then((response) => {
          setAuth({ accessToken: response.data.token, user: response.data.data.user });
          form.reset();
          navigate(from, { replace: true });
        })
        .catch((error: any) => {
          console.log(error);
          setServerError(error.response?.data?.message || "An error occurred");
        });
    });
  };
  if (auth?.accessToken) return <Navigate to={from} />;

  return (
    <PageProvider>
      <section className=" overflow-hidden relative">
        <div className="flex relative overflow-hidden flex-col  min-h-screen mx-auto justify-center  max-w-5xl  ">
          <div className=" py-3 px-6 min-h-64  rounded-2xl bg-gray-50 shadow-sm">
            <DynamicForm onSubmit={onSubmit} fieldArrays={loginArray} submitButtonText="Login" />
          </div>
        </div>
      </section>
    </PageProvider>
  );
};

export default Login;
