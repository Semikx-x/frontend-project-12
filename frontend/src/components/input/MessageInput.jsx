import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { selectActive } from '../slices/ChannelsSlice.js'
import { selectUser } from '../slices/LoginSlice.js'
import { addMessage } from '../slices/MessagesSlice.js'

const MessageInput = () => {
  const activeChat = useSelector(selectActive)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const renderMessages = async (values, { resetForm, setSubmitting, setErrors }) => {
    const message = { body: values.body, channelId: activeChat.id, userName: user }
    const result = await dispatch(addMessage(message)).unwrap()

    if (addMessage.fulfilled.match(result)) {
      resetForm()
    }
    else {
      setErrors({ general: result.payload })
    }
    setSubmitting(false)
  }

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={renderMessages}
    >
      {({
        values, handleChange, handleSubmit, isSubmitting,
      }) => (
        <footer className="p-3 bg-white border-top">
          <Form
            className="input-group mx-auto"
            style={{ maxWidth: '1000px' }}
            onSubmit={handleSubmit}
          >
            <Field
              name="body"
              className="form-control" // Стандартный инпут Bootstrap
              type="text"
              aria-label="Новое сообщение"
              placeholder="Написать сообщение"
              value={values.body}
              onChange={handleChange}
              disabled={isSubmitting}
            />
            <button
              className="btn btn-primary px-4 fw-semibold"
              type="submit"
              disabled={isSubmitting || !values.body.trim()}
            >
              {isSubmitting ? '...' : 'Отправить'}
            </button>
          </Form>
        </footer>
      )}
    </Formik>
  )
}

export default MessageInput
