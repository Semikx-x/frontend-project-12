import { useSelector, useDispatch } from 'react-redux'
import {selectActive } from "../slices/ChannelsSlice.js";
import { selectUser } from "../slices/LoginSlice.js";
import { addMessage } from '../slices/MessagesSlice.js'
import { Formik, Form, Field } from 'formik';

export const MessageInput = () => {
  const activeChat = useSelector(selectActive)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const styles = {
    inputWrapper: {
      padding: '20px',
      backgroundColor: 'white',
      borderTop: '1px solid #ddd'
    },
    form: {
      display: 'flex',
      gap: '10px',
      maxWidth: '1000px',
      margin: '0 auto',
      width: '100%'
    },
    input: {
      flex: 1,
      padding: '12px 15px',
      borderRadius: '8px',
      border: '1px solid #ccc',
      outline: 'none',
      fontSize: '16px'
    },
    button: {
      padding: '10px 25px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: '600'
    }
  }

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async (values, { resetForm, setSubmitting, setErrors }) => {
        const message = { body: values.body, channelId: activeChat, userName: user };
        const result = await dispatch(addMessage(message));
        
        if (addMessage.fulfilled.match(result)) {
          resetForm();
        } else {
          setErrors({ general: result.payload });
        }
        setSubmitting(false);
      }}
    >
      {({ values, handleChange, handleSubmit, isSubmitting }) => (
        <footer style={styles.inputWrapper}>
          <Form style={styles.form} onSubmit={handleSubmit}>
            <Field
              name="body"
              style={styles.input}
              type="text"
              placeholder="Написать сообщение"
              value={values.body}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <button 
              style={styles.button} 
              type="submit" 
              disabled={isSubmitting || !values.body.trim()}
            >
              {isSubmitting ? '...' : 'Отправить'}
            </button>
          </Form>
        </footer>
      )}
    </Formik>
  );
}