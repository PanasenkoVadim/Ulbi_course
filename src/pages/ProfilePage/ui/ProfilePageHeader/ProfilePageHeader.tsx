import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import css from './ProfilePageHeader.module.scss'

type ProfilePageHeaderProps = {
	className?: string
	readonly?: boolean
	isLoading?: boolean
	onEditClick?: () => void
	onCancelEdit?: () => void
	onSaveClick?: () => void
}

const ProfilePageHeader = ({
	className,
	readonly = true,
	onEditClick,
	onCancelEdit,
	onSaveClick,
	isLoading,
}: ProfilePageHeaderProps) => {
	const { t } = useTranslation()
	return (
		<div className={classNames(css.header, {}, [className])}>
			<Text className={css.title} title={t('Профиль')} />
			<div className={css.actions}>
				{readonly ? (
					<Button theme={ThemeButton.OUTLINE} onClick={onEditClick}>
						{t('Редактировать')}
					</Button>
				) : (
					<>
						<Button
							disabled={isLoading}
							theme={ThemeButton.OUTLINE_ACCENT}
							onClick={onCancelEdit}
						>
							{t('Отменить')}
						</Button>
						<Button
							disabled={isLoading}
							theme={ThemeButton.OUTLINE}
							onClick={onSaveClick}
						>
							{t('Сохранить')}
						</Button>
					</>
				)}
			</div>
		</div>
	)
}

export default ProfilePageHeader
