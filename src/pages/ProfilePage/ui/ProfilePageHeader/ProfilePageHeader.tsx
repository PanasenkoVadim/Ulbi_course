import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { Button, ButtonTheme } from 'shared/ui/Button/Button'
import { Text } from 'shared/ui/Text/Text'
import css from './ProfilePageHeader.module.scss'
import { useCallback } from 'react'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDIspatch'
import { getProfileFormData, profileActions } from 'entities/Profile'
import { updateProfileData } from 'entities/Profile/model/services/updateProfileData/updateProfileData'
import { getUserAuthData } from 'entities/user'
import { useSelector } from 'react-redux'

type ProfilePageHeaderProps = {
	className?: string
	readonly?: boolean
	isLoading?: boolean
}

const ProfilePageHeader = ({
	className,
	readonly = true,
	isLoading,
}: ProfilePageHeaderProps) => {
	const { t } = useTranslation()
	const dispatch = useAppDispatch()
	const authData = useSelector(getUserAuthData)
	const formData = useSelector(getProfileFormData)
	const isCanEdit = authData?.id === formData?.id
	
	const onEditClick = useCallback(() => {
		dispatch(profileActions.setReadonly(false))
	}, [dispatch])
	const onCancelEdit = useCallback(() => {
		dispatch(profileActions.cancelEdit())
	}, [dispatch])

	const onSaveClick = useCallback(() => {
			dispatch(updateProfileData())
	}, [dispatch])

	return (
		<div className={classNames(css.header, {}, [className])}>
			<Text className={css.title} title={t('Профиль')} />
			{isCanEdit && (
				<div className={css.actions}>
					{readonly ? (
						<Button theme={ButtonTheme.OUTLINE} onClick={onEditClick}>
							{t('Редактировать')}
						</Button>
					) : (
						<>
							<Button
								disabled={isLoading}
								theme={ButtonTheme.OUTLINE_ACCENT}
								onClick={onCancelEdit}
							>
								{t('Отменить')}
							</Button>
							<Button
								disabled={isLoading}
								theme={ButtonTheme.OUTLINE}
								onClick={onSaveClick}
							>
								{t('Сохранить')}
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	)
}

export default ProfilePageHeader
