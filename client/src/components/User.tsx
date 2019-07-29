import React from "react";

interface iProps {
  name: string;
  error: string;
  isFetching: boolean;
  handleLogin: () => void;
}

export class User extends React.Component<iProps> {
  renderTemplate = () => {
    const { name, error, isFetching } = this.props;

    if (error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>;
    }

    if (isFetching) {
      return <p>Загружаю...</p>;
    }

    if (name) {
      return <p>Привет, {name}!</p>;
    } else {
      return (
        <button className="btn" onClick={this.props.handleLogin}>
          Войти
        </button>
      );
    }
  };
  render() {
    return <div className="ib user">{this.renderTemplate()}</div>;
  }
}
