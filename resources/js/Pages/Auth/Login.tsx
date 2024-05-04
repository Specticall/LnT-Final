import { useEffect, FormEventHandler } from "react";
import Checkbox from "@/Components/Checkbox";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { error } from "console";
import TextField from "@/Components/general/TextField";
import Button from "@/Components/general/Button";

const formValues = {
  email: "",
  password: "",
  remember: false,
};
type TFieldValues = typeof formValues;

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } =
    useForm(formValues);

  console.log(errors, "error");

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  const register = <TFieldValue extends keyof TFieldValues>(
    fields: TFieldValue
  ) => {
    const onChange = (value: TFieldValues[TFieldValue] | undefined) => {
      setData((current) => {
        return {
          ...current,
          // If input is undefined then reset to default value.
          [fields]: value || formValues[fields],
        };
      });
    };

    return { onChange };
  };

  return (
    <GuestLayout className="h-full">
      <Head title="Log in" />

      <form onSubmit={submit} className="flex flex-col h-full">
        <div className="h-full flex-1 flex flex-col items-stretch justify-center">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="text-sm mb-4 text-light mt-2">Login to your account</p>
          <TextField
            className="mt-4"
            label="Email"
            placeholder="example@email.com"
            defaultValue={data?.email}
            {...register("email")}
            errorMessage={errors?.email}
          />
          <TextField
            type="password"
            className="mt-4"
            label="Password"
            placeholder="*******"
            defaultValue={data?.password}
            {...register("password")}
            errorMessage={errors?.password}
          />

          <div className="block mt-4">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="ms-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_2fr] items-center gap-4 pb-12">
          <Button disabled={processing}>Login</Button>
          <p className="text-sm text-light">
            Don't Have an Account?{" "}
            <span
              className="underline text-accent hover:opacity-60 duration-200 transition-all cursor-pointer"
              onClick={() => {
                router.get("/register");
              }}
            >
              Register
            </span>
          </p>
        </div>
      </form>
    </GuestLayout>
  );
}
