import React from 'react';
import '../assets/styles/components/CarouselItem.scss';

const CarouselItem = (props) => {
  const { logo, width, height, name, pk, id, bank } = props;

  const handleClick = () => {
    props.onClickItem({pk, id, name, bank});
  };

  return (
    <div className='carousel--item' style={{"width": width, "height": height}} onClick={handleClick}>
      <figure>
        <img src={logo} alt='bank'/>
      </figure>
      <p>{name}</p>
    </div>
  );
};

export default CarouselItem;
