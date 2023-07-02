import * as React from 'react'
import './ProjectApp.scss'

interface IProps {

}

interface IState {

}

function defaultState (_props: IProps): IState {
    return {}
}

export default class ProjectApp extends React.PureComponent<IProps, IState> {
    public state = defaultState(this.props)

    public constructor (props: IProps) {
        super(props)

        this.onMouseUp = this.onMouseUp.bind(this)
    }

    private onMouseUp () {
        console.log('mouse up')
    }

    public componentDidMount () {
        document.addEventListener('mouseup', this.onMouseUp, false)
    }

    public componentWillUnmount () {
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    public render () {
        return <div className="prap-root">
            project app
        </div>
    }
}
