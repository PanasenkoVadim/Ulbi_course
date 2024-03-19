import { Country } from 'entities/Country'
import { Currency } from 'entities/Currency'

export interface Profile {
	firstname?: string
	lastname?: string
	age?: number
	currency?: Currency
	country?: Country
	city?: string
	username?: string
	avatar?: string
}

export interface ProfileSchema {
	data?: Profile
	formData?: Profile
	isLoading: boolean
	error?: string
	readonly: boolean
	validateProfileError?: ValidateProfileError[]
}

export enum ValidateProfileError {
	INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
	INCORRECT_USER_AGE = 'INCORRECT_USER_AGE',
	INCORRECT_USER_CITY = 'INCORRECT_USER_CITY',
	NO_DATA = 'NO_DATA',
	SERVER_ERROR = 'SERVER_ERROR',
}
