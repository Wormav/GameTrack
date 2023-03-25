import * as yup from 'yup';
import yupPassword from 'yup-password';

yupPassword(yup);

const schemaForm = yup
  .object({
    pseudo: yup
      .string()
      .min(5, 'Le pseudo doit contenir au moins 5 caractères !'),

    email: yup.string().email('Veuillez entrer un email valide !'),
    password: yup
      .string()
      .min(8, 'Le mot de passe doit contenir au moins 8 caractères !')
      .minLowercase(
        1,
        'Le mot de passe doit contenir au moins une lettre minuscule !',
      )
      .minUppercase(
        1,
        'Le mot de passe doit contenir au moins une lettre majuscule',
      )
      .minNumbers(1, 'Le mot de passe doit contenir au moins un chiffe')
      .minSymbols(1, 'Le mot de passe doit contenir au moins un symbole'),

    content: yup.string().min(1),
  })
  .required();

export default schemaForm;
