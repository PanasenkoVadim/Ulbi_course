import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from 'app'
import { ThemeProvider } from 'app/providers/ThemeProvider'
import 'shared/config/i18n/i18n'
import 'app/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<ThemeProvider>
			<App />
		</ThemeProvider>
	</BrowserRouter>
)
