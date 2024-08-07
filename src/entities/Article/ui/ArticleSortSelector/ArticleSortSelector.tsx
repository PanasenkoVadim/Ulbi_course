import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import classNames from 'shared/lib/classNames/classNames'
import { SortOrder } from 'shared/types'
import Select, { SelectOption } from 'shared/ui/Select/Select'
import { ArticleSortField } from '../../model/types/article'
import css from './ArticleSortSelector.module.scss'

type ArticleSortSelectorProps = {
	className?: string
	sort: ArticleSortField
	order: SortOrder
	onChangeOrder: (newOrder: SortOrder) => void
	onChangeSort: (newSort: ArticleSortField) => void
}

export const ArticleSortSelector = memo((props: ArticleSortSelectorProps) => {
	const { className, sort, order, onChangeOrder, onChangeSort } = props
	const { t } = useTranslation()

	const orderOptions = useMemo<SelectOption<SortOrder>[]>(
		() => [
			{
				value: 'asc',
				label: t('по возрастанию'),
			},
			{
				value: 'desc',
				label: t('по убыванию'),
			},
		],
		[t]
	)

	const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
		() => [
			{
				value: ArticleSortField.TITLE,
				label: t('по названию'),
			},
			{
				value: ArticleSortField.CREATED,
				label: t('по дате'),
			},
			{
				value: ArticleSortField.VIEWS,
				label: t('по просмотрам'),
			},
		],
		[t]
	)

	return (
		<div className={classNames(css.sort, {}, [className])}>
			<Select
				options={sortFieldOptions}
				className={css.select}
				placeholder={t('Сортировать по')}
				value={sort}
				onChange={onChangeSort}
			/>
			<Select
				options={orderOptions}
				className={css.select}
				placeholder={t('Сортировать по')}
				value={order}
				onChange={onChangeOrder}
			/>
		</div>
	)
})
