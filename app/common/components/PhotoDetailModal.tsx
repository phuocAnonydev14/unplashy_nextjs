import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";
interface PhotoDetailModal {
  isOpen: boolean,
  onClose: () => void,

}

export const PhotoDetailModal = (props: PhotoDetailModal) => {
  const {isOpen, onClose} = props
  return <Modal styles={{modal:{maxWidth:"80dvw",width:"80dvw",maxHeight:"90dvh",height:"90dvh",overflow:"auto"}}} open={isOpen} onClose={onClose}>
      <p>test</p>
  </Modal>
}