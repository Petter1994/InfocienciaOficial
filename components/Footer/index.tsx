"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import {
  Button,IconButton
} from '@mui/material';

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


                {/*<motion.div*/}
                {/*    variants={{*/}
                {/*      hidden: {*/}
                {/*        opacity: 0,*/}
                {/*        y: -20,*/}
                {/*      },*/}

                {/*      visible: {*/}
                {/*        opacity: 1,*/}
                {/*        y: 0,*/}
                {/*      },*/}
                {/*    }}*/}
                {/*    initial="hidden"*/}
                {/*    whileInView="visible"*/}
                {/*    transition={{ duration: 1, delay: 0.1 }}*/}
                {/*    viewport={{ once: true }}*/}
                {/*    className="animate_top"*/}
                {/*>*/}
                {/*  <h4 className="mb-9 text-itemtitle2 font-medium text-black dark:text-white">*/}
                {/*    Nuestras Redes Sociales*/}
                {/*  </h4>*/}

                {/*  <ul>*/}
                {/*    <li>*/}
                {/*      <a*/}
                {/*          href="https://www.facebook.com/universidaduhcuba"*/}
                {/*          className="mb-3 inline-block hover:text-primary"*/}
                {/*      >*/}
                {/*        <FacebookIcon/>*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*    <li>*/}
                {/*      <a*/}
                {/*          href="https://www.instagram.com/udelahabana?igsh=NzRmNGdiZm0zb3Yx"*/}
                {/*          className="mb-3 inline-block hover:text-primary"*/}
                {/*      >*/}
                {/*        Instagram*/}
                {/*      </a>*/}
                {/*    </li>*/}
                {/*  </ul>*/}
                {/*</motion.div>*/}


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
                  <a
                      href="https://www.facebook.com/universidaduhcuba"
                      className="mb-3 inline-block hover:text-primary"
                  >
                    <FacebookIcon/>
                  </a>
                </li>
                <li>
                  <a
                      href="https://www.instagram.com/udelahabana?igsh=NzRmNGdiZm0zb3Yx"
                      className="mb-3 inline-block hover:text-primary"
                  >
                    <InstagramIcon/>
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
