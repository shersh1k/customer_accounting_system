import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { RouterState } from 'connected-react-router';

const Counter = (props: RouteComponentProps<any> & StateProps & DispatchProps) => (
  <div>
    Counter: {props.count}
    <button onClick={props.increment}>+</button>
    <button onClick={props.decrement}>-</button>
  </div>
)

interface StateProps {
  count: number
}
interface State {
  count: number
  router: RouterState
}
interface DispatchProps {
  increment: () => void
  decrement: () => void
}

const mapStateToProps = (state: any) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  increment: () => dispatch({
    type: 'INCREMENT',
  }),
  decrement: () => dispatch({
    type: 'DECREMENT',
  }),
})

export default connect<StateProps, DispatchProps, RouteComponentProps<any>>(mapStateToProps, mapDispatchToProps)(Counter)
