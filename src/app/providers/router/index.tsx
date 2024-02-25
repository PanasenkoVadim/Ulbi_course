import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader'

const Router = () => {
	return (
		<>
			<main>
				<div className='content'>
					<Suspense fallback={<PageLoader />}>
						<Routes>
							{Object.values(routeConfig).map(({ path, element }) => (
								<Route key={path} path={path} element={element} />
							))}
						</Routes>
					</Suspense>
				</div>
			</main>
		</>
	)
}

export default Router
