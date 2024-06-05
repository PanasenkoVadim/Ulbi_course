import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ThemeButton } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import css from './ProfilePageHeader.module.scss'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { profileActions } from 'entities/Profile'
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData'

type ProfilePageHeaderProps = {
	profileId?: string
	className?: string
	readonly?: boolean
	isLoading?: boolean
}

const ProfilePageHeader = ({
	className,
	readonly = true,
	isLoading,
	profileId,
}: ProfilePageHeaderProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const onEditClick = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])

	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit())
	}, [dispatch])

	const onSaveClick = useCallback(() => {
		if (profileId) {
			dispatch(updateProfileData(profileId))
		}
	}, [dispatch, profileId])

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
