import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormInput from "@components/atoms/FormInput";
import Button from "@components/atoms/Button";
import Logo from "@assets/logos/logo_up.png";
import supabase from "@/client/supabase";
import Google from "@assets/Icons/google.svg";
import Bg from "@assets/images/Bg-Up45.webp";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Skema validasi menggunakan Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string()
    .min(6, "Kata sandi harus terdiri dari minimal 6 karakter")
    .required("Kata sandi wajib diisi"),
});

const LoginFormMol = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // Kosongkan formulir saat halaman dimuat
    setInitialValues({ email: "", password: "" });
  }, []);

  const base64UrlEncode = (str) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(str))
      .replace(/=+$/, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  };

  const createJwtToken = (header, payload, secret) => {
    const encodedHeader = base64UrlEncode(JSON.stringify(header));
    const encodedPayload = base64UrlEncode(JSON.stringify(payload));
    const signature = CryptoJS.HmacSHA256(
      `${encodedHeader}.${encodedPayload}`,
      secret
    );
    const encodedSignature = base64UrlEncode(
      signature.toString(CryptoJS.enc.Base64)
    );
    return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
  };

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    const { email, password } = values;

    try {
      // Query ke tabel users untuk mendapatkan data pengguna berdasarkan email
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .single();

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login Gagal",
          text: "Pengguna tidak ditemukan",
        });
        setIsSubmitting(false);
        return;
      }

      // Cocokkan password plaintext dengan password yang tersimpan di database
      if (password !== data.password) {
        throw new Error("Password salah!");
      }

      const header = {
        alg: "HS256",
        typ: "JWT",
      };

      const payload = {
        id: data.id,
        email: data.email,
        role: data.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hour expiration
      };

      const secret = "your-secret-key"; // Ganti dengan kunci rahasia yang aman
      const token = createJwtToken(header, payload, secret);

      Swal.fire({
        title: "Berhasil",
        text: "Berhasil masuk!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        Cookies.set("user_session", token, { expires: 1 }); // Token expires in 24 hours
        // Arahkan ke halaman beranda atau halaman lain setelah login berhasil
        window.location.href = "/"; // Sesuaikan URL sesuai kebutuhan Anda
      });
    } catch (error) {
      console.error("Error:", error.message);
      Swal.fire({
        title: "Error",
        text: "Email atau Password salah!",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { user, session, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) {
        Swal.fire({
          icon: "error",
          title: "Login dengan Google gagal",
          text: error.message,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login dengan Google berhasil",
        });

        // Simpan data pengguna ke database
        if (user && session) {
          await saveUserToDatabase(user, session.access_token);
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error saat login dengan Google",
        text: error.message,
      });
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen px-4 bg-cover"
      style={{ backgroundImage: `url(${Bg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg text-neutral shadow-primary-dark md:w-3/4 lg:w-1/2 xl:w-1/3">
        <div className="flex justify-between">
          <h2 className="my-auto text-2xl font-semibold text-center">Masuk</h2>
          <img src={Logo} alt="Logo UP45" className="w-14 md:w-16" />
        </div>
        <Formik
          initialValues={initialValues}
          enableReinitialize
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
                      className="bg-neutral-light placeholder:text-sm text-primary-dark border-stone-300"
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
              <div className="relative pb-3">
                <Field name="password">
                  {({ field }) => (
                    <FormInput
                      label="Kata Sandi"
                      className="border bg-neutral-light placeholder:text-sm text-primary-dark border-stone-300"
                      type={showPassword ? "text" : "password"}
                      placeholder="Masukkan kata sandi Anda"
                      {...field}
                    />
                  )}
                </Field>
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                  style={{ top: "50%", transform: "translateY(-50%)" }}
                >
                  {showPassword ? (
                    <FaEyeSlash className="flex w-5 h-5 mt-6 text-gray-500" />
                  ) : (
                    <FaEye className="w-5 h-5 mt-6 text-gray-500" />
                  )}
                </button>
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
                className="w-full font-semibold bg-primary-dark text-neutral-light hover:bg-primary-light hover:text-neutral"
                disabled={isSubmitting || !(isValid && dirty)}
              />
            </Form>
          )}
        </Formik>
        <Button
          name="Login dengan Google"
          size="md"
          className="w-full mt-4 font-semibold transition-transform duration-500 border border-white shadow-md hover:border-slate-300 bg-neutral-100 hover:bg-neutral-200 hover:scale-105 shadow-neutral-400 text-neutral-800"
          onClick={handleGoogleLogin}
          icon={<img src={Google} alt="Google" className="w-8 h-8" />}
        />
      </div>
    </div>
  );
};

export default LoginFormMol;
