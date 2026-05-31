import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import { selectActive } from '../slices/ChannelsSlice.js'
import { selectUser } from '../slices/LoginSlice.js'
import { addMessage } from '../slices/MessagesSlice.js'
import { useEffect, useRef } from 'react'

const MessageInput = () => {
  const activeChat = useSelector(selectActive)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [activeChat])

  const renderMessages = async (values, { resetForm, setSubmitting, setErrors }) => {
    const message = { body: values.body, channelId: activeChat.id, userName: user }
    const result = await dispatch(addMessage(message)).unwrap()

    if (addMessage.fulfilled.match(result)) {
      resetForm()
      inputRef.current?.focus()
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
              innerRef={inputRef}
              name="body"
              className="form-control"
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
