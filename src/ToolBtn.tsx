import * as React from 'react'
import './ToolBtn.scss'

interface IProps {
}

// function onBtnClick (props: IProps, event: React.MouseEvent | React.TouchEvent) {
//     props.onClick(props.tool)
//     event.preventDefault()
//     event.nativeEvent.stopImmediatePropagation()
// }

const ToolBtn = (_props: IProps) => {
    return <button className="prap-btn">

    </button>
}

export default React.memo(ToolBtn)
