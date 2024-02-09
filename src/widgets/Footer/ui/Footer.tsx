import { type FC } from 'react'
import Container from '../../Container/Container'
import css from './Footer.module.scss'

export const Footer: FC = () => {
  return (
        <footer className={css.footer}>
          <Container>
                <div className={css.inner}>Footer</div>
            </Container>
      </footer>
  )
}
