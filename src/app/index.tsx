import { Footer } from 'widgets/Footer'
import { Header } from 'widgets/Header'
import { Sidebar } from 'widgets/Sidebar'
import classNames from '../shared/lib/classNames/classNames'
import { useTheme } from './providers/ThemeProvider'
import Router from './providers/router'
import './styles/index.scss'

export default function App() {
	const { theme } = useTheme()

	return (
		<div className={classNames('app', {}, [theme])}>
			<Header />
			<div className='wrapper'>
				<Sidebar />
				<Router />
			</div>
			<Footer />
		</div>
	)
}
