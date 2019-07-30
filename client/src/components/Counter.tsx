import React from "react";
// import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { State } from "../store";
import { increment, decrement } from "../store/counter/actions";

const Counter = (
  props: RouteComponentProps<any> & StateProps & DispatchProps
) => {
  return (
    <div>
      Counter: {props.count}
      <button onClick={props.increment}>+</button>
      <button onClick={props.decrement}>-</button>
    </div>
  );
};

interface StateProps {
  count: number;
}
interface DispatchProps {
  increment: () => void;
  decrement: () => void;
}

const mapStateToProps = (state: State) => ({
  count: state.counter.count
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    increment: () => dispatch(increment()),
    decrement: () => dispatch(decrement())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);
