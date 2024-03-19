import { Profile, ValidateProfileError } from '../../types/profile'

export const validateErrorText = {
	[ValidateProfileError.INCORRECT_USER_DATA]:
		'Поля имя и фамилия должный быть заполнены',
	[ValidateProfileError.INCORRECT_USER_AGE]: 'Укажите свой возраст',
	[ValidateProfileError.INCORRECT_USER_CITY]: 'Укажите свой город проживания',
	[ValidateProfileError.NO_DATA]: 'Не удалось получить данные пользователя',
	[ValidateProfileError.SERVER_ERROR]: 'Ошибка сеервера',
}

export const validateProfileData = (profile?: Profile) => {
	if (!profile) return [ValidateProfileError.NO_DATA]
	const { firstname, lastname, age, city } = profile
	const errors: ValidateProfileError[] = []

	if (!firstname || !lastname) {
		errors.push(ValidateProfileError.INCORRECT_USER_DATA)
	}

	if (!age || !Number.isInteger(age)) {
		errors.push(ValidateProfileError.INCORRECT_USER_AGE)
	}
	if (!city) {
		errors.push(ValidateProfileError.INCORRECT_USER_CITY)
	}
	return errors
}
