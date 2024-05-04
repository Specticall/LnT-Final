import { useEffect, FormEventHandler } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Head, Link, useForm } from "@inertiajs/react";
import Button from "@/Components/general/Button";
import TextField from "@/Components/general/TextField";

const formValues = {
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone_number: "",
};
type TFieldValues = typeof formValues;

export default function Register() {
  const { data, setData, post, processing, errors, reset } =
    useForm(formValues);

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

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

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    console.log(data);

    post(route("register"));
  };
  return (
    <GuestLayout className="h-full pt-24">
      <Head title="Log in" />

      <form onSubmit={submit} className="flex flex-col h-full">
        <div className="h-full flex-1 flex flex-col items-stretch justify-center">
          <h1 className="text-3xl font-semibold">Register</h1>
          <p className="text-sm mb-4 text-light mt-2">
            Create your new account
          </p>
          <TextField
            className="mt-8"
            label="Email*"
            placeholder="alexia@gmail.com"
            defaultValue={data?.email}
            {...register("email")}
            errorMessage={errors?.email}
            hint="The following fields must end with @gmail.com"
          />

          <TextField
            className="mt-8"
            label="Name*"
            placeholder="Alexia"
            defaultValue={data?.name}
            {...register("name")}
            errorMessage={errors?.name}
            hint="The following fields need to be atleast 3 characters long and can not be longer than 40 characters"
          />
          <TextField
            className="mt-8"
            label="Phone Number"
            placeholder="08888888"
            defaultValue={data?.phone_number}
            {...register("phone_number")}
            errorMessage={errors?.phone_number}
            hint="The following fields need to start with ‘08’. e.g. ‘084242455”"
          />

          <TextField
            type="password"
            className="mt-8"
            label="Password"
            placeholder="*******"
            defaultValue={data?.password}
            {...register("password")}
            errorMessage={errors?.password}
            hint="The following fields need to be atleast 6 characters long and can not be longer than 12 characters"
          />
          <TextField
            type="password"
            className="mt-8"
            label="Confirm Password"
            placeholder="*******"
            defaultValue={data?.password_confirmation}
            {...register("password_confirmation")}
            errorMessage={errors?.password_confirmation}
          />
        </div>
        <div className="grid grid-cols-[1fr_2fr] items-center gap-4 py-12">
          <Button disabled={processing}>Register</Button>
          <p className="text-sm text-light">
            Already Have an Account?{" "}
            <Link
              href={route("login")}
              className="underline text-accent hover:opacity-60 duration-200 transition-all cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </GuestLayout>
  );
}
//Backup (ini layout breeze yg asli)
/*


  return (
    <GuestLayout>
      <Head title="Register" />

      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="name" value="Name" />

          <TextInput
            id="name"
            name="name"
            value={data.name}
            className="mt-1 block w-full"
            autoComplete="name"
            isFocused={true}
            onChange={(e) => setData("name", e.target.value)}
            required
          />

          <InputError message={errors.name} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            onChange={(e) => setData("email", e.target.value)}
            required
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="phone_number" value="Phone Number" />

          <TextInput
            id="phone_number"
            type="text"
            name="phone_number"
            value={data.phone_number}
            className="mt-1 block w-full"
            onChange={(e) => {
              setData("phone_number", e.target.value);
            }}
            required
          />

          <InputError message={errors.phone_number} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password", e.target.value)}
            required
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel
            htmlFor="password_confirmation"
            value="Confirm Password"
          />

          <TextInput
            id="password_confirmation"
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            onChange={(e) => setData("password_confirmation", e.target.value)}
            required
          />

          <InputError message={errors.password_confirmation} className="mt-2" />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Link
            href={route("login")}
            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Already registered?
          </Link>

          <PrimaryButton className="ms-4" disabled={processing}>
            Register
          </PrimaryButton>
        </div>
      </form>
    </GuestLayout>
  );
*/
