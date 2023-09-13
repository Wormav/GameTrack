import * as yup from 'yup';
import yupPassword from 'yup-password';
import i18n from '@src/i18n';

yupPassword(yup);

export const schemaFormSignin = yup
  .object({

    email: yup.string().email(i18n.t('auth:formSchema.emailError')),

    content: yup.string().min(1),
  })
  .required();

export const schemaFormSignup = yup
  .object({
    pseudo: yup
      .string()
      .matches(/^[^\s]+$/, i18n.t('auth:formSchema.invisibleCharUnauthorized'))
      .min(5, i18n.t('auth:formSchema.usernameSize')),
    email: yup
      .string()
      .matches(/^[^\s]+$/, i18n.t('auth:formSchema.invisibleCharUnauthorized'))
      .email(i18n.t('auth:formSchema.emailError')),
    password: yup
      .string()
      .min(8, i18n.t('auth:formSchema.passwordCharMin'))
      .minLowercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterLower'),
      )
      .minUppercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterUpper'),
      )
      .minNumbers(1, i18n.t('auth:formSchema.passwordOneNumber'))
      .minSymbols(1, i18n.t('auth:formSchema.passwordOneSymbol')),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], i18n.t('auth:formSchema.passwordMatch')),

    content: yup.string().min(1),
  })
  .required();

export const schemaFormAddTime = yup.object({
  hours: yup.number().min(0, i18n.t('auth:formSchema.positiveNumber')).max(876000, 'Le nombre d\'heures est trop grand !').transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  })
    .nullable(),
  minutes: yup.number().min(0, i18n.t('auth:formSchema.positiveNumber')).max(59, 'Le nombre de minutes est trop grand').transform((value, originalValue) => {
    if (originalValue === '') {
      return null;
    }
    return value;
  })
    .nullable(),
});

export const schemaFormUpdateUser = yup
  .object({
    pseudo: yup
      .string()
      .matches(/^[^\s]+$/, i18n.t('auth:formSchema.invisibleCharUnauthorized'))
      .min(5, i18n.t('auth:formSchema.usernameSize'))
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .nullable(),
    password: yup
      .string()
      .min(8, i18n.t('auth:formSchema.passwordCharMin'))
      .minLowercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterLower'),
      )
      .minUppercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterUpper'),
      )
      .minNumbers(1, i18n.t('auth:formSchema.passwordOneNumber'))
      .minSymbols(1, i18n.t('auth:formSchema.passwordOneSymbol'))
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .nullable(),
    passwordConfirmation: yup.string().oneOf([yup.ref('password')], i18n.t('auth:formSchema.passwordMatch')).transform((value, originalValue) => {
      if (originalValue === '') {
        return null;
      }
      return value;
    })
      .nullable(),
  });

export const schemaResetPassword = yup
  .object({
    email: yup
      .string()
      .matches(/^[^\s]+$/, i18n.t('auth:formSchema.invisibleCharUnauthorized'))
      .email(i18n.t('auth:formSchema.emailError')),
  })
  .required();

export const schemaResetPasswordUpdate = yup
  .object({
    password: yup
      .string()
      .min(8, i18n.t('auth:formSchema.passwordCharMin'))
      .minLowercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterLower'),
      )
      .minUppercase(
        1,
        i18n.t('auth:formSchema.passwordOneLetterUpper'),
      )
      .minNumbers(1, i18n.t('auth:formSchema.passwordOneNumber'))
      .minSymbols(1, i18n.t('auth:formSchema.passwordOneSymbol'))
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        return value;
      })
      .nullable(),
    code: yup
      .string()
      .min(8, i18n.t('auth:formSchema.codeCharMin')),
  })
  .required();
