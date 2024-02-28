import { Suspense, useEffect } from 'react'
import { Footer } from 'widgets/Footer'
import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'
import classNames from 'shared/lib/classNames/classNames'
import { useTheme } from './providers/ThemeProvider'
import Router from './providers/router'
import './styles/index.scss'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { userActions } from 'entities/user'

export default function App() {
	const { theme } = useTheme()
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(userActions.initAuthData())
	}, [dispatch])

	return (
		<div className={classNames('app', {}, [theme])}>
			<Suspense fallback=''>
				<Header />
				<div className='wrapper'>
					<Sidebar />
					<Router />
				</div>
				<Footer />
			</Suspense>
			<div id='modal_wrapper'></div>
		</div>
	)
}
