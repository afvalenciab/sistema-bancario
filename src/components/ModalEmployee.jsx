import React, { useState } from 'react';
import close from '../assets/static/close.svg';
import '../assets/styles/components/ModalEmployee.scss';

const ModalEmployee = (props) => {
  const { handleCloseModal, branch } = props;
  const [messageSuccess, setMessageSuccess] = useState('');
  const [form, setForm] = useState({
    "branch": branch,
  });

  const handleInput = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createEmployee();
  };

  const handleCloseClick = () => {
    handleCloseModal();
    setMessageSuccess('');
  };

  const createEmployee = () => {
    setMessageSuccess('');
    const api = `https://tryouts-cumplo.herokuapp.com/employees/?branch=${branch}&format=api`;
    const employee = form;

    fetch(api, {
      method: 'POST',
      body: JSON.stringify(employee),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(() => {
        console.log('Success');
        setMessageSuccess('El empleado fue creado exitosamente');
      })
      .catch((error) => console.log('Error:', error));
  };

  return (
    <div className='overlay__modal'>
      <div className='modal__container'>
        <section className='modal'>
          <div className='close' onClick={handleCloseClick}>
            <figure>
              <img src={close} alt="close"/>
            </figure>
            {/* <i className='icon-close icon' onClick={props.handleCloseClick} /> */}
          </div>
          <h2>Nuevo Empleado</h2>
          <hr className='line' />
          <form onSubmit={handleSubmit} className='form'>
            <p className='form__success'>{messageSuccess}</p>
            <input
              type='text'
              name='name'
              className='input'
              placeholder='Nombre'
              onChange={handleInput}
              required
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
            />
            <input
              type='text'
              name='middle_name'
              className='input'
              placeholder='Segundo Nombre'
              onChange={handleInput}
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
            />
            <input
              type='text'
              name='last_name'
              className='input'
              placeholder='Apellido'
              onChange={handleInput}
              pattern="[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+"
            />
            <button type='submit' className='button'>
              Crear
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ModalEmployee;
