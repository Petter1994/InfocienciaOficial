"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from 'notistack';


const Signup = () => {
   const { enqueueSnackbar } = useSnackbar()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();


  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmPassword) {
      return enqueueSnackbar("Contraseñas no coinciden", { variant: 'success' });
    }

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      router.push("/");
    }
  });


  return (
    <>
      {/* <!-- ===== SignUp Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Registrarse
            </h2>

            <form onSubmit={onSubmit}>

              <label htmlFor="username" className="text-slate-500 mb-2 block text-sm">
                Nombre de Usuario:
              </label>
              <input
                type="text"
                {...register("username", {
                  required: {
                    value: true,
                    message: "Usuario requerido",
                  },
                })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="usuario123"
              />

              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}

              <label htmlFor="email" className="text-slate-500 mb-2 block text-sm">
                Correo:
              </label>
              <input
                type="email"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Correo requerido",
                  },
                })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="usuario@correo.com"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">{errors.email.message}</span>
              )}

              <label htmlFor="password" className="text-slate-500 mb-2 block text-sm">
                Contraseña:
              </label>
              <input
                type="password"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Contraseña requerida",
                  },
                })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="********"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}

              <label
                htmlFor="confirmPassword"
                className="text-slate-500 mb-2 block text-sm"
              >
                Confirmar Contraseña:
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: {
                    value: true,
                    message: "Contraseña requerida",
                  },
                })}
                className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-full"
                placeholder="********"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}

              <div className="justify-center items-center mx-auto">
                <button
                  type="submit"
                  aria-label="signup with email and password"
                  className="mt-5 mx-auto  inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  Registrarse
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>



              <div className="mt-12.5 border-t border-stroke py-5 text-center dark:border-strokedark">
                <p>
                  Ya tienes Cuenta?{" "}
                  <Link
                    className="text-black hover:text-primary dark:text-white dark:hover:text-primary"
                    href="/auth/signin"
                  >
                    Autenticarse
                  </Link>
                </p>
              </div>
            </form>


          </motion.div>
        </div>
      </section >
      {/* <!-- ===== SignUp Form End ===== --> */}
    </>
  );
};

export default Signup;
