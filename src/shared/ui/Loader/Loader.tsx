import classNames from 'shared/lib/classNames/classNames'
import css from './Loader.module.scss'

interface LoaderProps {
  className?: string
}

const Loader = ({className}: LoaderProps) => {

  return (
        <><div className={classNames(css.loader, {}, [className])}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </>
  )
}

export default Loader
