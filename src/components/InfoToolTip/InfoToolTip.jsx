import React from 'react';
import success from '../../images/success.png';
import fail from '../../images/fail.png';
import Popup from '../Popup/Popup';
import '../Popup/Popup.css';

const InfoTooltip = (props) => {
  const { isError, message } = props.requestStatus;
  return (
    <Popup isOpen={props.isOpen}
           onClose={props.onClose}
    >
      <img src={isError
        ? fail
        : success
      }
           alt="Картинка статуса регистрации"
           className="popup__status-image"
      />
      <h2 className="popup__status-title">
        {message}
      </h2>
    </Popup>
  );
};

export default InfoTooltip;
