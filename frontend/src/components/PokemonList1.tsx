import React, { FunctionComponent } from 'react';
import favorite from '../media/icons/favorite.png';
import unfavorite from '../media/icons/unfavorite.png';
import { checkPropTypes } from 'prop-types';
import { Link } from 'react-router-dom';



// no children defined here
type IPokemonListProps = {
  PokemonArr: any,
  onFav(value:string):void,
  onunFav(value:string):void,
}

export const PokemonList1: React.FunctionComponent<IPokemonListProps> = ({ PokemonArr,onFav,onunFav, children}) => {

  return (
    <div className="container-col-view">
      {PokemonArr.map((item,i) => {
          return (
              <div key={i} className="col-card-div">
                  <div className="col-card-div__pokemon">
                    <Link className="col-card-div__pokemon__link" to={`/${item.name}`}>
                      <img src={item.image} className="col-card-div__pokemon__img"></img>
                    </Link>
                  </div>
                  <div className="col-card-div__footer">
                    <div className="col-card-div__footer__text">
                      <h1 className="col-card-div__footer__text__1">{item.name}</h1>
                      <label className="col-card-div__footer__text__2">{item.types.join(', ')}</label>
                    </div>
                    {
                      item.isFavorite?
                      <div className="col-card-div__footer__icondiv" onClick={() => onunFav(item.id)}>
                        <img className="col-card-div__footer__icondiv__favoriteIcon" src={favorite}></img>
                      </div>
                      :
                      <div className="col-card-div__footer__icondiv" onClick={() => onFav(item.id)}>
                        <img className="col-card-div__footer__icondiv__favoriteIcon" src={unfavorite}></img>
                      </div>
                    }
                  </div>  
              </div>
          )
      })}
    </div>
  );
}


