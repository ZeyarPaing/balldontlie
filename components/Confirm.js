import styles from "../styles/Modal.module.scss";

const Confirm = ({
  title,
  message,
  okText = "Ok",
  cancelText = "Cancel",
  onCancel,
  onConfirm,
}) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.confirmBox}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div>
          <button onClick={onCancel}>{cancelText}</button>
          <button onClick={onConfirm} className="primary-btn">
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;
