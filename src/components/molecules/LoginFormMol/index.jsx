import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormInput from "@components/atoms/FormInput";
import Button from "@components/atoms/Button";
import Paragraph from "@components/atoms/Paragraph";
import { Link } from "react-router-dom";
import supabase from "@/client/supabase";
import Google from "@assets/Icons/google.svg";

// Skema validasi menggunakan Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi harus terdiri dari minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
});

const LoginFormMol = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (values) => {
    setIsSubmitting(true);
    console.log("Login:", values);

    // Simulasi proses login
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        console.error("Login dengan Google gagal", error);
      } else {
        console.log("Login dengan Google berhasil", { user, session });
      }
    } catch (error) {
      console.error("Error saat login dengan Google", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 ">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg shadow-primary-dark md:w-3/4 lg:w-1/2 xl:w-1/3">
        <h2 className="text-2xl font-semibold text-center">Masuk</h2>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ isValid, dirty }) => (
            <Form className="space-y-6">
              <div>
                <Field name="email">
                  {({ field }) => (
                    <FormInput
                      label="Email"
                      type="email"
                      placeholder="Masukkan email Anda"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="absolute text-[12px] text-red-500"
                />
              </div>
              <div className="pb-3">
                <Field name="password">
                  {({ field }) => (
                    <FormInput
                      label="Kata Sandi"
                      type="password"
                      placeholder="Masukkan kata sandi Anda"
                      {...field}
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="absolute text-[12px] text-red-500"
                />
              </div>
              <Button
                type="submit"
                name="Masuk"
                size="md"
                className="w-full font-semibold bg-primary-dark text-neutral-light hover:bg-primary-light"
                disabled={isSubmitting && isValid && dirty}
              />
            </Form>
          )}
        </Formik>
        <Button
          name="Login dengan Google"
          size="md"
          className="w-full mt-4 font-semibold transition-transform duration-500 border border-white shadow-md bg-neutral-100 hover:bg-neutral-200 hover:scale-105 shadow-neutral-400 text-neutral-800"
          onClick={handleGoogleLogin}
          icon={<img src={Google} alt="Google" className="w-8 h-8" />}
        />
        <Paragraph>
          Belum punya akun?
          <Link to="#" className="ml-2 text-secondary-dark">
            Daftar
          </Link>
        </Paragraph>
      </div>
    </div>
  );
};

export default LoginFormMol;
