import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ModalEmployee from '../components/ModalEmployee';
import '../assets/styles/components/BootstrapTable.scss';
import '../assets/styles/Employees.scss';

const Employees = (props) => {
  const { currentBank, currentBranch } = props;
  const [listEmployees, setListEmployees] = useState([]);
  const [modalCreateEmpVisible, setModalCreateEmpVisible] = useState(false);

  const handleReturnBanks = () => {
    props.history.push('/');
  };

  const handleOpenModal = () => {
    setModalCreateEmpVisible(true);
  };

  const handleCloseModal = () => {
    setModalCreateEmpVisible(false);
  };

  useLayoutEffect(() => {
    let isTheEnd = false;
    let listEmployeeBranch = [];
    
    try {
      const fetchData = async () => {
        let apiNextFetch =`https://tryouts-cumplo.herokuapp.com/employees/?branch=${currentBranch.id}`;
        while(!isTheEnd) {
          const response = await fetch(apiNextFetch);
          const data = await response.json();
          listEmployeeBranch = listEmployeeBranch.concat(data.results);

          if (data.next){
            apiNextFetch = data.next;
          } else {
            isTheEnd = true;
            setListEmployees(listEmployeeBranch);
          }
        }
      };
      
      fetchData()
    } catch (error) {
      console.log(error);
       throw error; 
    }
  }, []);

  return (
    <>
      <main className='employees--container'>
        <header className='employees--header'>
          <button type='button' onClick={handleReturnBanks}>← Regresar a los Bancos</button>
        </header>
        <section className='employees--details'>
          <h2>
            <span>Banco:</span> {currentBank.name}
            <span> Sucural:</span> {`${currentBranch.name} - ${currentBranch.id}`}
          </h2>
          <div className='employees'>
            <h2>Empleados:</h2>
            <div className='button--container'>
              <button type='button' onClick={handleOpenModal}>Crear Empleado</button>
            </div>
            <div className='employees--list'>
              <BootstrapTable data={listEmployees} striped hover pagination>
                <TableHeaderColumn isKey dataField='id' dataSort={ true } >Id</TableHeaderColumn>
                <TableHeaderColumn  dataField='name' >Nombre</TableHeaderColumn>
                <TableHeaderColumn  dataField='middle_name' >Segundo Nombre</TableHeaderColumn>
                <TableHeaderColumn  dataField='last_name' >Apellido</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>
        </section>
      </main>
      {modalCreateEmpVisible && (
        <ModalEmployee {...props} branch={currentBranch.id} handleCloseModal={handleCloseModal} />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    currentBank: state.currentBank,
    currentBranch: state.currentBranch,
  };
};

export default connect(mapStateToProps, null)(Employees);
