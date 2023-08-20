import * as yup from 'yup';
import yupPassword from 'yup-password';

yupPassword(yup);

export const schemaFormSignin = yup
  .object({

    email: yup.string().email('Veuillez entrer un email valide !'),

    content: yup.string().min(1),
  })
  .required();

export const schemaFormSignup = yup
  .object({
    pseudo: yup
      .string()
      .matches(/^[^\s]+$/, 'Les caractères invisibles ne sont pas autorisés')
      .min(5, 'Le pseudo doit contenir au moins 5 caractères !'),
    email: yup
      .string()
      .matches(/^[^\s]+$/, 'Les caractères invisibles ne sont pas autorisés')
      .email('Veuillez entrer un email valide !'),
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
      .minNumbers(1, 'Le mot de passe doit contenir au moins un chiffre')
      .minSymbols(1, 'Le mot de passe doit contenir au moins un symbole'),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], 'Les mots de passe ne sont pas identiques'),

    content: yup.string().min(1),
  })
  .required();

export const schemaFormAddTime = yup.object({
  hours: yup.number().min(0, 'Le nombre doit être positif !').max(876000, 'Le nombre d\'heures est trop grand !').transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  })
    .nullable(),
  minutes: yup.number().min(0, 'Le nombre doit être positif !').max(59, 'Le nombre de minutes est trop grand').transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  })
    .nullable(),
});
