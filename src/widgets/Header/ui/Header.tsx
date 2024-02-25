import { LoginModal } from 'features/AuthByUsername'
import { useCallback, useState, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import Container from '../../Container/Container'
import css from './Header.module.scss'

export const Header: FC = () => {
	const { t } = useTranslation()
	const [modalOpen, setModalOpen] = useState(false)
	const onToggleModal = useCallback(() => {
		setModalOpen(prev => !prev)
	}, [])
	return (
		<header className={css.header}>
			<Container>
				<div className={css.inner}>
					<div className={css.logo}>LOGO</div>
					<div className={css.personal}>
						<Button theme={ThemeButton.CLEAR} className={css.personal_btn}>
							{t('Зарегистрироваться')}
						</Button>
						<Button
							onClick={onToggleModal}
							theme={ThemeButton.CLEAR}
							className={css.personal_btn}
						>
							{t('Войти')}
						</Button>
					</div>
				</div>
			</Container>
			<LoginModal isOpen={modalOpen} onClose={onToggleModal} />
		</header>
	)
}
