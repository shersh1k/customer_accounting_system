import React from "react";
import { iVKPhoto } from "../helpers/VK.API/types";

interface iProps {
  year: number;
  photos: iVKPhoto[];
  getPhotos: Function;
  isPending: boolean;
  error?: string;
}

export class Photos extends React.Component<iProps> {
  onBtnClick = (e: any) => {
    console.log(this.props);
    const year = parseInt(e.currentTarget.innerText);
    this.props.getPhotos(year); // setYear -> getPhotos
  };
  renderTemplate = () => {
    const { photos, isPending, error } = this.props;

    if (error)
      return <p className="error">Во время загрузки фото произошла ошибка</p>;
    if (isPending) return <p>Загрузка...</p>;
    else
      return photos.map((
        photo,
        index // [1]
      ) => (
        <div key={index} className="photo">
          <p>
            <img src={photo.sizes[2].url} alt="" />
          </p>
          <p>{photo.likes.count} ❤</p>
        </div>
      ));
  };

  render() {
    const { year, photos } = this.props;
    return (
      <div className="ib page">
        <p>
          <button className="btn" onClick={this.onBtnClick}>
            2019
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2018
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2017
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2016
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2015
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2014
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2013
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2012
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2011
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2010
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2009
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2008
          </button>{" "}
          <button className="btn" onClick={this.onBtnClick}>
            2007
          </button>{" "}
        </p>
        <h3>
          {year} год [{photos.length}]
        </h3>
        {this.renderTemplate()}
      </div>
    );
  }
}
