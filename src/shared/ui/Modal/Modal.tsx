import classNames from "shared/lib/classNames/classNames"
import css from './Modal.module.scss'
import { FC, ReactNode, useCallback, useEffect } from 'react'


interface ModalProps{
    className?: string; 
		children?: ReactNode;
		isOpen?: boolean;
		onClose?: ()=> void
}

export const Modal: FC<ModalProps> = (props) => {
    const {
        className,
        children,
				isOpen= false,
				onClose
    } = props;
		
		const closeHandler = useCallback(() =>{
			if(onClose){
				onClose()
				console.log("close")
			}
		},[onClose])
		
		const onKeyDown = useCallback((e:KeyboardEvent) =>{
			if(e.key==="Escape"){
				closeHandler()
			}
		},[closeHandler])

		useEffect(()=>{
			if(isOpen){
				window.addEventListener("keydown", onKeyDown)
			}
			return()=>{
				window.removeEventListener("keydown", onKeyDown)
			}
		},[isOpen,onKeyDown])
		
    return (
        <div className={classNames(css.modal, {[css.opened]: isOpen }, [className])}>
					<div className={css.overlay} onClick={closeHandler}>
						<div className={css.content} onClick={(e)=>e.stopPropagation()}>
							{children}
							<div className={css.closeBtn} onClick={closeHandler}>&#215;</div>
						</div>
					</div>
        </div>
    );
};
