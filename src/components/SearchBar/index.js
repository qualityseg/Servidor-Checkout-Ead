import React, { useState } from 'react';
import cursosData from './cursos.json';
import styles from './CursosEad.module.scss';

const Catalogo = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState(cursosData);
  const [selectedCourses, setSelectedCourses] = useState([]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    if (searchTerm) {
      const filteredResults = cursosData.filter((curso) =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults(cursosData);
    }
  };

  const handleCourseSelection = (e) => {
    const courseId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedCourses((prevSelectedCourses) => [...prevSelectedCourses, courseId]);
    } else {
      setSelectedCourses((prevSelectedCourses) =>
        prevSelectedCourses.filter((id) => id !== courseId)
      );
    }
  };

  const handleCheckout = async () => {
    // Envia os IDs dos cursos selecionados para o servidor
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ courses: selectedCourses }),
    });
    const data = await response.json();

    // Redireciona o usuário para a página de checkout do Mercado Pago
    window.location.href = data.init_point;
  };

  return (
    <div>
      <div className={styles.searchContainer}>
        <div className={styles['search-bar']}>
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className={styles['search-icon']}></div>
        </div>
      </div>
      <button onClick={handleCheckout}>Finalizar compra</button>
      <div className={`${styles.treatments} ${styles.center}`}>
        {searchResults.map((curso) => (
          <div
            className={styles.treatmentsItem}
            data-aos="fade-up"
            key={curso.id}
          >
            <div className={styles.images}>
              <img
                src={curso.imageSrc}
                alt={curso.titulo}
                className={styles.image}
                width={250}
                height={137}
              />
            </div>
            <h3>{curso.titulo}</h3>
            <div className={styles.description}>
              <p>{curso.descricao}</p>
            </div>
            <div className={styles.courseInfo}>
              <div className={styles.courseInfoItem}>
                <p className={styles.courseInfoText}>Carga Horaria: {curso.carga_horaria}</p>
              </div>
              <div className={styles.courseInfoItem}>
                <p className={styles.courseInfoText}>Valor: {curso.valor}</p>
              </div>
            </div>
            <label htmlFor={`course-${curso.id}`}>Selecione o curso</label>
            <input
              type="checkbox"
              id={`course-${curso.id}`}
              value={curso.id}
              onChange={handleCourseSelection}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogo;
