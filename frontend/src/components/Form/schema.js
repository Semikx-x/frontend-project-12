import * as yup from 'yup'

export const getChannelSchema = (channels) => {

  const channelsNames = channels.map(chat => chat.name)

  return yup.object().shape({
    name: yup.string().trim().required('Обязательное поле').notOneOf(channelsNames, 'Занято Нахуй!').min(3, 'Минимальная длина 3 символа').max(20, 'Максимальная длина 20 символов')
  })
}

export const getRegistrationSchema = () => {

  return yup.object().shape({
    userName: yup.string().trim().required('Обязательное поле').min(3, 'Минимальная длина 3 символа').max(20, 'Максимальная длина 20 символов'),
    password: yup.string().trim().required('Обязательное поле').min(3, 'Минимальная длина 6 символа').max(20, 'Максимальная длина 20 символов'),
    acceptPassword: yup.string().trim().required('Обязательное поле').oneOf([yup.ref('password')], 'Пароли не совпадают')
  })
}