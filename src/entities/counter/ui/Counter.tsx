import { useDispatch, useSelector } from 'react-redux'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue'
import { counterActions } from '../model/slice/counterSlice'

export const Counter = () => {
	const dispath = useDispatch()
	const value = useSelector(getCounterValue)
	const increment = () => {
		dispath(counterActions.increment())
	}
	const decrement = () => {
		dispath(counterActions.decrement())
	}
	return (
		<>
			<h1>{value}</h1>
			<Button theme={ThemeButton.BACKGROUND} onClick={increment}>
				+
			</Button>
			<Button theme={ThemeButton.BACKGROUND} onClick={decrement}>
				-
			</Button>
		</>
	)
}
