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
      // Pokemon type is set only once when the page is rendered for the firest time
      this.setState({
        pokemonTypes:nextProps.getPokemonTypes.pokemonTypes,
      })
    }
  } 

   if(nextProps.fetchPokemonList.loading == false){
    // Pokemon list fetched everytime when serach/type or favorite is selected
    this.setState({
      pokemonList:nextProps.fetchPokemonList.pokemons.edges
    })
  }
}

typechange(e: React.FormEvent<HTMLSelectElement>){
  // Fetch pokemons according to the type selected 
  let typeValue: string = e.currentTarget.value.trim();
  this.setState({
    typeSelected: typeValue,
    cross:true
  });

  if(this.state.isFavoriteSelected){
    this.props.fetchPokemonList.refetch({
      input:{
        limit:151,
        search:this.state.searchText,
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
        search:this.state.searchText,
        filter:{
          type:typeValue
        }
      }
  })
  }
}

searchTextChange(e: React.FormEvent<HTMLInputElement>){
  // Search pokemons according to the search field 
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
          isFavorite:this.state.isFavoriteSelected,
          type:this.state.typeSelected
        }
      }
    })
  } else{
    this.props.fetchPokemonList.refetch({
      input:{
        search:searchtextValue,
        filter:{
          type:this.state.typeSelected
        }
      }
    })
  }
}

onAllButtonClick(e:React.MouseEvent<HTMLElement>){
  //Fetch all pokemons
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
  //Fetch only all the pokemons marked as favorite
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
  // on selecting pokemon as favorite
  this.props.markFavorite({
    variables:{
      input:value
    }
  });
}

unFav(value:string){
  // on selecting pokemon as unfavorite
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
  // Displays pokemon list in column view
  this.setState({
    listColDisplay:true
  })
}

onDisplayTypeRow(){
  // Displays pokemon list in row view
  this.setState({
    listColDisplay:false
  })
}

listToDisplay(){
  // container to display pokemon list
  if(this.state.listColDisplay){
    if(this.state.pokemonList.length>3){
      // Fetch pokemon list when column view is selected and returnd list contains more than 3 pokemons
      return(
        <PokemonList1 
        PokemonArr={this.state.pokemonList}
        onFav={this.Fav.bind(this)}
        onunFav={this.unFav.bind(this)}
      />
      )
    } else{
      return(
        // Fetch pokemon list when column view is selected and returnd list contains less than 3 pokemons (to prevent cards from spreading)
        <PokemonList2 
        PokemonArr={this.state.pokemonList}
        onFav={this.Fav.bind(this)}
        onunFav={this.unFav.bind(this)}
      />
      )
    }
  }else{
    // Fetch pokemon list when row view is selected
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
  //Populate pokemon type in dropdown
  return this.state.pokemonTypes.map((item,i) =>{
    return <option key={i} id={'type'+i} value={item}>{item}</option>
  })
}

renderTopbar() {
  if(this.state.isFavoriteSelected) {
    return(
      <div className="home-header-btn-div">
        <div className="home-header-btn-div-all" onClick={e => this.onAllButtonClick(e)}>
          <label className="home-header-btn-txt ">All</label>
        </div> 
        <div className="home-header-btn-div-favorite selected-tab" onClick={e => this.onFavButtonClick(e)}>
          <label className="home-header-btn-txt">Favourites</label>
        </div>
      </div>
      )
  } else{
    return(
      <div className="home-header-btn-div">
        <div className="home-header-btn-div-all selected-tab" onClick={e => this.onAllButtonClick(e)}>
          <label className="home-header-btn-txt ">All</label>
            </div> 
          <div className="home-header-btn-div-favorite" onClick={e => this.onFavButtonClick(e)}>
            <label className="home-header-btn-txt">Favourites</label>
          </div>
      </div>
      )
    }
  }

ondeselect(){
  //Clear the selected option from the select type dropdown
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