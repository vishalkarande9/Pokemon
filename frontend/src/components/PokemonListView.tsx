import React, { FunctionComponent } from 'react';
import favorite from '../media/icons/icon_fav_selected.png';
import unfavorite from '../media/icons/icon_fav_unselected.png';
import { Link } from 'react-router-dom';

type IPokemonListProps = {
  PokemonArr: any,
  onFav(value:string,name:string):void,
  onunFav(value:string,name:string):void,
}

export const PokemonListView: React.FunctionComponent<IPokemonListProps> = ({ PokemonArr,onFav,onunFav, children}) => {

  return (
    <div className="container-row-view">
      {PokemonArr.map((item,i) => {
          return (
              <div key={i} className="row-card-div">

                    <Link className="row-card-div__pokemon__link" to={`/${item.name}`}>
                      <img src={item.image} className="row-card-div__pokemon__img"></img>
                    </Link>
     
                    <div className="row-card-div__footer__text">
                      <Link className="pokemon_detail_link" to={`/${item.name}`}><h1 className="row-card-div__footer__text__1">{item.name}</h1></Link>
                      <label className="row-card-div__footer__text__2">{item.types.join(',')}</label>
                    </div>
                    {item.isFavorite?
                      <div className="row-card-div__footer__icondiv" onClick={() => onunFav(item.id,item.name)}>
                        <img className="row-card-div__footer__icondiv__favoriteIcon" src={favorite}></img>
                      </div>
                      :
                      <div className="row-card-div__footer__icondiv" onClick={() => onFav(item.id,item.name)}>
                        <img className="row-card-div__footer__icondiv__favoriteIcon" src={unfavorite}></img>
                      </div>
                    }
              </div>
              
          )
      })}
      
    </div>
  );
}


