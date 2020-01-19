export const emailValidator = email => {
  /* eslint-disable-next-line */
  const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  emailRegex.test(email)
}
