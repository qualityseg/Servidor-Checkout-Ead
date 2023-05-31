import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Header } from "../src/components/Header";
import { HeaderPage } from "../src/components/HeaderPage";
import { MyImage } from "../src/components/MyImage";
import { Footer } from "../src/components/Footer";
import { Title } from "../src/components/Title";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "./styles.module.scss";
import CursosEad from "../src/components/SearchBar";

export default function Tratamentos() {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
   
      <Header/>

      <HeaderPage>

      </HeaderPage>
    
      <CursosEad/>

      <section className={styles.images}>
        <Title title="QualitySEG Cursos EAD" subtitle="Qualidade é Nosso Destaque" />

        <ul className={`${styles.imagesContainer} mainContainer`}>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/nr1.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
              
            />
          </li>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/fachada.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
              
            />
          </li>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/eadcursos.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
             
            />
          </li>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/produto4.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
              
            />
          </li>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/produto5.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
             
            />
          </li>
          <li data-aos="zoom-in-up">
            <Image
              src="/images/produto6.png"
              alt="Produtos em Destaque"
              width={460}
              height={390}
              
            />
          </li>
        </ul>
      </section>

      <Footer />
    </>
  );
}
