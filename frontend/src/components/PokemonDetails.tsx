import * as React from 'react';
import {graphql,compose} from 'react-apollo';
import { fetchPokemonByName,markFavorite,markunFavorite } from '../queries/queries';
import { RouteComponentProps } from 'react-router-dom';
//import { FetchPokemonbyNameQuery} from '../generated/graphql';
import playIcon from '../media/icons/icon_volume.png';
import favorite from '../media/icons/favorite.png';
import unfavorite from '../media/icons/unfavorite.png';



class PokemonDetails extends React.Component<IPokemonDetailsProps,IPokemonDetailsState>{

  constructor(props:IPokemonDetailsProps) {
    super(props);
     this.state = {
         name: this.props.match.params.name,
         pokemonByName:{},
         soundUrl:"",
         audioKey:new Date().getTime().toString()
    };
}

componentDidMount(){
    this.props.fetchPokemonByName.refetch({
      input:this.state.name
    }) 
    
  }

componentWillReceiveProps(nextProps:any) {
console.log(nextProps);
if(nextProps.fetchPokemonByName.loading == false){
 this.setState({
  pokemonByName:nextProps.fetchPokemonByName.pokemonByName
 })
}
}

onUnFavBtnClick(name:string,id:string){
  this.props.markunFavorite({
    variables:{
      input:id
    }
  });
  this.props.fetchPokemonByName.refetch({
    input:name
  }) 
}

onFavBtnClick(name:string,id:string){
  this.props.markFavorite({
    variables:{
      input:id
    }
  });
  this.props.fetchPokemonByName.refetch({
    input:name
  }) 
}

play(value:string) {
  this.setState({
    soundUrl:value,
    audioKey: new Date().getTime().toString()
  })
}


renderEvolution(){
  if(this.state.pokemonByName['evolutions']){
    return this.state.pokemonByName['evolutions'].map((item,i) =>{
      return(
        <div key={i} className="pokemon-evolution-div__body__card">
        <div className="pokemon-evolution-div__body__card__imgdiv">
          <img className="pokemon-evolution-div__body__card__imgdiv__img" src={item.image}></img>
        </div>
        <div className="pokemon-evolution-div__body__card__footer">
          <div className="pokemon-evolution-div__body__card__footer__namediv">
            <h1 className="pokemon-evolution-div__body__card__footer__namediv__txt">{item.name}</h1>
          </div>
          <div className="pokemon-evolution-div__body__card__footer__favdiv">
            {item.isFavorite?
            <img onClick={() => this.onUnFavBtnClick(this.state.name,item.id)} className="pokemon-evolution-div__body__card__footer__favdiv__icon" src={favorite}></img>
            :
            <img onClick={() => this.onFavBtnClick(this.state.name,item.id)} className="pokemon-evolution-div__body__card__footer__favdiv__icon" src={unfavorite}></img>
            } 
          </div>
        </div>  

      </div>

      )
    })
  }
}


 


render(){
  
  
    return (
      <div className="main-home-container">
          <div className="pokemon-detail-div"> 
            <div className="pokemon-detail-div__card">
              <div className="pokemon-detail-div__card__header">
                <div className="pokemon-detail-div__card__header__img__div">
                    <img className="pokemon-detail-div__card__header__img__div__img" src={this.state.pokemonByName['image']}></img>
                </div>
                <div className="pokemon-detail-div__card__header__sound__div" onClick={()=>this.play(this.state.pokemonByName['sound'])}>
                    <img className="pokemon-detail-div__card__header__sound__div__icon" src={playIcon}></img>
                    {this.state.soundUrl===""?<div></div>:
                      <audio className="audio" controls autoPlay key={this.state.audioKey}>
                        <source src={this.state.soundUrl} type="audio/mpeg"></source>
                      </audio>
                    }
                </div>

              </div>
              <div className="pokemon-detail-div__card__body">
                <div className="pokemon-detail-div__card__body__name">
                  <h1 className="pokemon-detail-div__card__body__name__txt">
                    {this.state.pokemonByName['name']}
                  </h1>  
                </div>
                <div className="pokemon-detail-div__card__body__type">
                    {this.state.pokemonByName['types']?
                      <label className="pokemon-detail-div__card__body__type__txt">
                        {this.state.pokemonByName['types'].join(', ')}
                      </label>
                      :
                      <label className="pokemon-detail-div__card__body__type__txt"> 
                      </label>
                    }                    
                </div>
                <div className="pokemon-detail-div__card__body__fav">
                    {this.state.pokemonByName['isFavorite']?
                    <img onClick={() => this.onUnFavBtnClick(this.state.pokemonByName['name'],this.state.pokemonByName['id'])}
                         className="pokemon-detail-div__card__body__fav__icon" src={favorite}></img> 
                    :
                    <img onClick={() => this.onFavBtnClick(this.state.pokemonByName['name'],this.state.pokemonByName['id'])}
                    className="pokemon-detail-div__card__body__fav__icon" src={unfavorite}></img> 
                    } 
                </div>

                <div className="pokemon-detail-div__card__body__cpbar">
                </div>
                <div className="pokemon-detail-div__card__body__hpbar">
                </div>

                <div className="pokemon-detail-div__card__body__cp">
                  <label className="pokemon-detail-div__card__body__cp__txt">
                    CP : {this.state.pokemonByName['maxCP']}
                  </label>
                </div>
                <div className="pokemon-detail-div__card__body__hp">
                  <label className="pokemon-detail-div__card__body__hp__txt">
                    HP : {this.state.pokemonByName['maxHP']}
                  </label>
                </div>


              </div> 
              <div className="pokemon-detail-div__card__footer">
                  <div className="pokemon-detail-div__card__footer__weight">
                    <h1 className="pokemon-detail-div__card__footer__weight__header">
                        Weight
                    </h1>
                    <div className="pokemon-detail-div__card__footer__weight__footer">
                      {this.state.pokemonByName['weight']?
                        <label className="pokemon-detail-div__card__footer__weight__footer__txt">
                          {this.state.pokemonByName['weight']['minimum']+'-'+this.state.pokemonByName['weight']['maximum']}
                        </label>
                        :
                        <label className="pokemon-detail-div__card__footer__weight__footer__txt"> 
                        </label>
                      }
                        
                    </div>

                  </div>
                  <div className="pokemon-detail-div__card__footer__height">
                    <h1 className="pokemon-detail-div__card__footer__height__header">
                       Height
                    </h1>
                    <div className="pokemon-detail-div__card__footer__height__footer">
                      {this.state.pokemonByName['height']?
                        <label className="pokemon-detail-div__card__footer__height__footer__txt">
                          {this.state.pokemonByName['height']['minimum']+'-'+this.state.pokemonByName['height']['maximum']}
                        </label>
                        :
                        <label className="pokemon-detail-div__card__footer__height__footer__txt"> 
                        </label>
                      }
                    </div>

                  </div>
              </div>  
            </div>
          </div>
          {this.state.pokemonByName['evolutions']?
            <div className="pokemon-evolution-div">
              <div className="pokemon-evolution-div__heading">
                <h1 className="pokemon-evolution-div__heading__txt">Evolutions</h1>
              </div>
              <div className="pokemon-evolution-div__body">
  
                {this.renderEvolution()} 
              </div>

            </div>
          :<div></div>
          }     
          
      </div>
    )
  }
}

interface IPokemonDetailsProps extends RouteComponentProps<{name : string}> {
    fetchPokemonByName:any;
    markFavorite:any;
    markunFavorite:any;
}

interface IPokemonDetailsState{
    name:string;
    pokemonByName:any;
    soundUrl:string;
    audioKey:string;
}


export default compose(
    graphql(fetchPokemonByName, {name:"fetchPokemonByName",
    options(){
      return {
        variables: {
          input:""
          }
        }
      }
    }),
    graphql(markFavorite, {name:"markFavorite"}),
    graphql(markunFavorite, {name:"markunFavorite"}) 

) (PokemonDetails);