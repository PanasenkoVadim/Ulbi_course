import { getUserAuthData } from 'entities/user'
import { Suspense, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { routeConfig } from 'shared/config/routeConfig/routeConfig'
import { PageLoader } from 'shared/ui/PageLoader'

const Router = () => {
	const isAuth = useSelector(getUserAuthData)
	const routes = useMemo(() => {
		return Object.values(routeConfig).filter(route => {
			return route.authOnly && !isAuth ? false : true
		})
	}, [isAuth])
	return (
		<>
			<main>
				<div className='content'>
					<Suspense fallback={<PageLoader />}>
						<Routes>
							{routes.map(({ path, element }) => (
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
