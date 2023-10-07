import './modal.css';
import { useMediaQuery } from 'react-responsive'

const Modal = ({ handleClose, show, children, isCreate, isRooms, isJoin }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";
  const isMobile = useMediaQuery({ query: '(max-width: 1000px)' });
  const isShort = useMediaQuery({ query: '(max-height: 600px)' });
  const styles = {
    width: isMobile ? '80%' : '40%',
    height: isShort ? '70%' : '60%', 
    border: isCreate ? '1px solid rgb(255, 0, 106)' : '1px solid  rgba(0,212,255,1)'
  }
  if (isRooms){
    styles.width = '60%'
  }
  if (isJoin && !isShort){
    styles.height = '40%'
  }
  return (
    <div className={showHideClassName}>
      <section className="modal-main" style={styles}>
        {children}
        <button type="button" className='closeButton' onClick={handleClose}>
          &#10006;
        </button>
      </section>
    </div>
  );
};

export default Modal