import React from 'react';
import { connect } from 'react-redux';
import { setBranchesBank, setCurrentBranch } from '../actions';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import bank from '../assets/static/bank.svg';
import subsidiary from '../assets/static/subsidiary.svg';
import '../assets/styles/Home.scss';

const Home = (props) => {
  const { banksList, branchesBankList, setBranchesBank, currentBank, setCurrentBranch } = props;

  const handleClickBank = ({pk, name}) => {
    setBranchesBank({pk, name});
  };

  const handleClickBranch = ({id, name, bank}) => {
    setCurrentBranch({id, name, bank});
    props.history.push(`/empleados`);
  };

  return (
    <main className='home--container'>
      <h1>Sistema Bancario</h1>
      <section className='home--banks'>
        <h2>Lista de Bancos</h2>
        <Carousel>
          {banksList && 
            banksList.map((item) => (
              <CarouselItem key={item.pk} logo={bank} width='180px' height='180px' {...item} onClickItem={handleClickBank} />
            ))
          }
        </Carousel>
      </section>
        {branchesBankList.length > 0 && (
          <section className='home--sucursales'>
            <h2>
              <span>Banco:</span> {currentBank.name}
            </h2>
            <h3>Sucursales:</h3>
            <Carousel>
              {branchesBankList.map((item) => (
                <CarouselItem key={item.id} logo={subsidiary} width='150px' height='150px' {...item} onClickItem={handleClickBranch}/>
              ))}
            </Carousel>
          </section>
        )}
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    banksList: state.banksList,
    branchesBankList: state.branchesBankList,
    currentBank: state.currentBank,
  };
};

const mapDispatchToProps = {
  setBranchesBank,
  setCurrentBranch,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
