import React from "react";

interface iProps {
  friends: any[];
  getFriends: Function;
  isPending: boolean;
  error?: string;
}

export class Friends extends React.Component<iProps> {

  onBtnClick = (e: any) => {
    console.log(this.props);
    this.props.getFriends();
  };
  
  renderTemplate = () => {
    const { friends, isPending, error } = this.props;

    if (error)
      return <p className="error">Во время загрузки друзей произошла ошибка</p>;
    if (isPending) return <p>Загрузка...</p>;
    else
      return friends.map((friend, index) => (
        <div key={index} className="friend">
          <p>
            {friend.first_name} {friend.last_name}
          </p>
        </div>
      ));
  };

  render() {
    return (
      <div className="ib page">
        <button className="btn" onClick={this.onBtnClick}>
          Показать друзей
        </button>{" "}
        <h3>У меня {this.props.friends.length} друзей</h3>
        {this.renderTemplate()}
      </div>
    );
  }
}
