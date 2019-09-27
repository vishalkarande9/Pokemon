import * as React from 'react';
import {graphql,compose} from 'react-apollo';
import {getPokemonTypes,fetchPokemonList,markFavorite,markunFavorite} from '../queries/queries';
import col from '../media/icons/col-view.png';
import row from '../media/icons/row-view.png';
import cross from '../media/icons/cross.png';

// components
import  {PokemonList1}  from './PokemonList1';
import  {PokemonList2}  from './PokemonList2';
import {PokemonList3} from './PokemonList3';


class App extends React.Component<IlistProps,IlistState>{

  constructor(props:IlistProps) {
    super(props);
    this.state = {
      pokemonTypes:[],
      typeSelected:"",
      searchText:"",
      pokemonList:[],
      isFavoriteSelected:false,
      listColDisplay:true,
      cross:false
    }
}



componentDidMount(){
  this.props.fetchPokemonList.refetch({
    input:{
      limit:151
    }
  }) 
  
}


componentWillReceiveProps(nextProps:any) {

  if(nextProps.getPokemonTypes.loading == false){
    if(this.state.pokemonTypes.length==0){

      this.setState({
        pokemonTypes:nextProps.getPokemonTypes.pokemonTypes,
      })
    }
  } 

   if(nextProps.fetchPokemonList.loading == false){
    this.setState({
      pokemonList:nextProps.fetchPokemonList.pokemons.edges
    })
  }
}

typechange(e: React.FormEvent<HTMLSelectElement>){
  let typeValue: string = e.currentTarget.value.trim();
  this.setState({
    typeSelected: typeValue,
    cross:true
  });

  if(this.state.isFavoriteSelected){
    this.props.fetchPokemonList.refetch({
      input:{
        limit:151,
        filter:{
          type:typeValue,
          isFavorite:this.state.isFavoriteSelected
        }
      }
  })
  } else{
    this.props.fetchPokemonList.refetch({
      input:{
        limit:151,
        filter:{
          type:typeValue
        }
      }
  })
  }


}

searchTextChange(e: React.FormEvent<HTMLInputElement>){
  let searchtextValue: string = e.currentTarget.value;
  this.setState({
    searchText: searchtextValue
  });

  if(this.state.isFavoriteSelected){
    this.props.fetchPokemonList.refetch({
      input:{
        search:searchtextValue,
        limit:151,
        filter:{
          isFavorite:this.state.isFavoriteSelected
        }
      }
    })
  } else{
    this.props.fetchPokemonList.refetch({
      input:{
        search:searchtextValue
      }
    })
  }
 
}

onAllButtonClick(e:React.MouseEvent<HTMLElement>){
  this.setState({
    isFavoriteSelected: false
  });
  this.props.fetchPokemonList.refetch({
    input:{
      limit:151,
      search:this.state.searchText,
      filter:{
        type:this.state.typeSelected
      }
    }
  }) 
}

onFavButtonClick(e:React.MouseEvent<HTMLElement>){
  this.setState({
    isFavoriteSelected: true
  });
  this.props.fetchPokemonList.refetch({
    input:{
      limit:151,
      search:this.state.searchText,
      filter:{
        type:this.state.typeSelected,
        isFavorite:true
      }
    }
  }) 
}



Fav(value:string){
  this.props.markFavorite({
    variables:{
      input:value
    }
  });
}
unFav(value:string){
  this.props.markunFavorite({
    variables:{
      input:value
    }
  });
  if(this.state.isFavoriteSelected){
    this.props.fetchPokemonList.refetch({
      input:{
        search:this.state.searchText,
        limit:151,
        filter:{
          type:this.state.typeSelected,
          isFavorite:true
        }
      }
    }) 
  }
}

onDisplayTypeCol(){
  this.setState({
    listColDisplay:true
  })
}

onDisplayTypeRow(){
  this.setState({
    listColDisplay:false
  })
}

listToDisplay(){
  if(this.state.listColDisplay){
    if(this.state.pokemonList.length>3){
      return(
        <PokemonList1 
        PokemonArr={this.state.pokemonList}
        onFav={this.Fav.bind(this)}
        onunFav={this.unFav.bind(this)}
      />
      )
    } else{
      return(
        <PokemonList2 
        PokemonArr={this.state.pokemonList}
        onFav={this.Fav.bind(this)}
        onunFav={this.unFav.bind(this)}
      />
      )
    }
  }else{
    return(
      <PokemonList3 
      PokemonArr={this.state.pokemonList}
      onFav={this.Fav.bind(this)}
      onunFav={this.unFav.bind(this)}
    />
    )
  }

  
}



renderType(){

  return this.state.pokemonTypes.map((item,i) =>{
    return <option key={i} id={'type'+i} value={item}>{item}</option>
  })
}

  renderTopbar() {
    if(this.state.isFavoriteSelected) {
      return(<div className="home-header-btn-div">
                <div className="home-header-btn-div-all" onClick={e => this.onAllButtonClick(e)}>
                  <label className="home-header-btn-txt ">All</label>
                </div> 
                <div className="home-header-btn-div-favorite selected-tab" onClick={e => this.onFavButtonClick(e)}>
                  <label className="home-header-btn-txt">Favourites</label>
                </div>
              </div>)
    } else {
      return(<div className="home-header-btn-div">
                <div className="home-header-btn-div-all selected-tab" onClick={e => this.onAllButtonClick(e)}>
                  <label className="home-header-btn-txt ">All</label>
                </div> 
                <div className="home-header-btn-div-favorite" onClick={e => this.onFavButtonClick(e)}>
                  <label className="home-header-btn-txt">Favourites</label>
                </div>
              </div>)
    }
  }

  ondeselect(){
    this.setState({
      typeSelected:"",
      cross:false
    })

    this.props.fetchPokemonList.refetch({
      input:{
        limit:151,
        search:this.state.searchText,
        filter:{
          isFavorite:this.state.isFavoriteSelected
        }
      }
    }) 

  }

  render(){
    return (
        <div className="main-home-container">
          {this.renderTopbar()}
          <div className="home-input-div">
            <div className="search-input-div">
              <input className="search-input-txt" 
                type="text" placeholder="Search" 
                id="search" maxLength={15} 
                name="searchPokemon" value={this.state.searchText} 
                onChange={e => this.searchTextChange(e)}> 
              </input>
            </div>
          
          {this.state.cross?
          <div className="select-type-div">                    
            <select id="select-type" name="type" value={this.state.typeSelected} disabled onChange={e => this.typechange(e)}>
              <option id={'type'+0} value="" disabled >Type</option>
              {this.renderType()}
            </select>
          </div>
          :
          <div className="select-type-div">                    
          <select id="select-type" name="type" value={this.state.typeSelected} onChange={e => this.typechange(e)}>
            <option id={'type'+0} value="" disabled >Type</option>
            {this.renderType()}
          </select>
          </div>
          }

          {this.state.typeSelected? 
          <div className="cross-icon-div">
            <img onClick={() => this.ondeselect()} className="cross-icon-div__icon" id="cross" src={cross}></img>
          </div>
          :
          <div></div>
          }
          <div className="home-input-row-view" onClick={() => this.onDisplayTypeRow()}>
              <img className="home-input-row-view__icon" src={row}></img>
          </div>

          <div className="home-input-col-view" onClick={() => this.onDisplayTypeCol()}>
            <img className="home-input-col-view__icon" src={col}></img>
          </div>    

          </div> 
          <div className="container">

          {this.listToDisplay()}  
       
          </div>
        </div>
    )
  }
}

interface IlistProps{
  fetchPokemonList:any;
  markFavorite:any;
  markunFavorite:any;
}

interface IlistState{
  pokemonTypes:Array<string>;
  typeSelected:string;
  searchText:string;
  pokemonList:any;
  isFavoriteSelected:Boolean;
  listColDisplay:Boolean;
  cross:Boolean;
}


export default compose(
  graphql(getPokemonTypes,{name:"getPokemonTypes"}),
  graphql(fetchPokemonList, {name:"fetchPokemonList",
    options(){
      return {
        variables: {
          input:{
              limit:100
            }
          }
        }
      }
    }),
  graphql(markFavorite, {name:"markFavorite"}),
  graphql(markunFavorite, {name:"markunFavorite"})   

) (App);