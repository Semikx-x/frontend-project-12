import * as yup from 'yup'
import filter from 'leo-profanity'

export const getChannelSchema = (channels) => {

  const channelsNames = channels.map(chat => chat.name)
  filter.clearList()
  filter.add(filter.getDictionary('en'))
  filter.add(filter.getDictionary('ru'))

  return yup.object().shape({
    name: yup
      .string()
      .trim()
      .required('Обязательное поле')
      .notOneOf(channelsNames, 'Канал с таким названием уже существует!')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      // .test(
      //   'BadWords',
      //   'Матюки это плохо)',
      //   (value) => !filter.check(value)
      // )
  })
}

export const getRegistrationSchema = () => {

  return yup.object().shape({
    userName: yup.string().trim().required('Обязательное поле').min(3, 'От 3 до 20 символов').max(20, 'От 3 до 20 символов'),
    password: yup.string().trim().required('Обязательное поле').min(6, 'Не менее 6 символов'),
    acceptPassword: yup.string().trim().required('Обязательное поле').oneOf([yup.ref('password')], 'Пароли должны совпадать')
  })
}