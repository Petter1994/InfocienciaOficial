"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          {/* <!-- Footer Top --> */}
          <div className="py-20 lg:py-25">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
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
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-1/2 lg:w-1/4"
              >
                <a href="/" className="relative">
                  <Image
                    width={110}
                    height={80}
                     src="/images/logo/info-logo.png"
                    alt="Logo"
                    className="dark:hidden"
                  />
                  <Image
                    width={110}
                    height={80}
                    src="/images/logo/info-logo.png"
                    alt="Logo"
                    className="hidden dark:block"
                  />
                </a>

                <p className="mb-10 mt-5">
                Explorando lo imposible, descubriendo lo increíble.
                </p>

                <p className="mb-1.5 text-sectiontitle uppercase tracking-[5px]">
                  Contáctanos
                </p>
                <a
                  href="#"
                  className="text-itemtitle font-medium text-black dark:text-white"
                >
                  infocienciaUH@gmail.com
                </a>
              </motion.div>

              <div className="flex w-full flex-col gap-8 md:flex-row md:justify-between md:gap-0 lg:w-2/3 xl:w-7/12">
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
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                   Enlaces Rápidos
                  </h4>

                  <ul>
                    <li>
                      <a
                        href="#"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Inicio
                      </a>
                    </li>
                    <li>
                      <a
                        href="/blog"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Artículos
                      </a>
                    </li>
                    <li>
                      <a
                        href="/center"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Centros
                      </a>
                    </li>
                    <li>
                      <a
                          href="/event"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Eventos
                      </a>
                    </li>
                    <li>
                      <a
                          href="/course"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Cursos
                      </a>
                    </li>
                  </ul>
                </motion.div>

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
                  className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Enlaces Útiles
                  </h4>

                  <ul>
                    <li>
                      <a
                        href="https://serviciosacademicos.fundacion.uh.cu/"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Servicios Académicos
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://accesoabierto.uh.cu/s/biblioteca/page/inicio"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Biblioteca
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://fundacioninnova.uh.cu/"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Fundación INNOVA
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://cursos.fundacion.uh.cu/"
                        className="mb-3 inline-block hover:text-primary"
                      >
                        Cursos
                      </a>
                    </li>
                  </ul>
                </motion.div>


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
                    className="animate_top"
                >
                  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">
                    Nuestras Redes Sociales
                  </h4>

                  <ul>
                    <li>
                      <a
                          href="https://serviciosacademicos.fundacion.uh.cu/"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                          href="https://accesoabierto.uh.cu/s/biblioteca/page/inicio"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Imstagram
                      </a>
                    </li>
                    <li>
                      <a
                          href="https://fundacioninnova.uh.cu/"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Cojon Pelu
                      </a>
                    </li>
                    <li>
                      <a
                          href="https://cursos.fundacion.uh.cu/"
                          className="mb-3 inline-block hover:text-primary"
                      >
                        Otra mas
                      </a>
                    </li>
                  </ul>
                </motion.div>


              </div>
            </div>
          </div>
          {/* <!-- Footer Top --> */}

          {/* <!-- Footer Bottom --> */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
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
              className="animate_top"
            >
              <ul className="flex items-center gap-8">
                <li>
                  <a href="#" className="hover:text-primary">
                    INFOCIENCIA UH
                  </a>
                </li>
                <li>
                  <h1>
                    Políticas de Seguridad
                  </h1>
                </li>
              </ul>
            </motion.div>

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
              className="animate_top"
            >
              <p>
                &copy; {new Date().getFullYear()} Infociencia. All rights reserved
              </p>
            </motion.div>

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
              className="animate_top"
            >
              <ul className="flex items-center gap-5">
                <li>
                  <a href="#" aria-label="social icon">
                    <svg
                      className="fill-[#D1D8E0] transition-all duration-300 hover:fill-primary"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_48_1499)">
                        <path
                          d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"
                          fill=""
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_48_1499">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </a>
                </li>
              
               
              </ul>
            </motion.div>
          </div>
          {/* <!-- Footer Bottom --> */}
        </div>
      </footer>
    </>
  );
};

export default Footer;
