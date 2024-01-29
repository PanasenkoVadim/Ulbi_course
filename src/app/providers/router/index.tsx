import { AboutPage, CatalogPage, ContactsPage, HomePage } from "pages";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { routeConfig } from "shared/config/routeConfig/routeConfig";

const Router = () => {
  return (
    <>
      <main>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            {Object.values(routeConfig).map(({ path, element }) => (
              <Route key={path} path={path} element={element} />
            ))}
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default Router;
