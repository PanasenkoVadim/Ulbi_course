import { StateSchema } from 'app/providers/StoreProvider'
import { getCounterValue } from './getCounterValue'

describe('getCounterValue', () => {
	test('should return counter value', () => {
		const state: StateSchema = {
			counter: { value: 10 },
			user: {},
		}
		expect(getCounterValue(state)).toEqual(10)
	})
})
