import { type FC } from 'react'
import { Navbar } from 'widgets/Navbar'
import Container from '../../Container/Container'
import css from './Header.module.scss'
export const Header: FC = () => {

  return (
        <header className={css.header}>
          <Container>
                <div className={css.inner}>
                  <div className={css.logo}>LOGO</div>
                  <Navbar />
              </div>
            </Container>
      </header>
  )
}
