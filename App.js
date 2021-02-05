import React, { Component } from 'react';
import { StyleSheet, View, Text,Alert} from 'react-native';
import params from './src/params'
import MineField from './src/components/MineField'
import Header from './src/components/Header'
import SelecioneONivel from './src/screens/SelecioneONivel'
import { 
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  inverteFlag,
  bandeiraUsed

} from './src/logica'

export default class App extends Component {

  constructor(props) {
    super(props)
    this.state = this.createState()
  }

  // funcao que ira calcular quantas minas tera no tabuleiro 

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return Math.ceil(cols * rows * params.difficultLevel)
  }

    createState = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()
    return {
        board: createMinedBoard(rows, cols, this.minesAmount()),
        won: false,
        lost: false,
        showLevelSelection: false,
    }
  }
onOpenField = (row, column) => {
const board = cloneBoard(this.state.board)
openField(board, row,column)
const lost = hadExplosion(board)
const won = wonGame(board)

if(lost) {
  showMines(board)
  Alert.alert('perdeeeeeeeeeu!', 'que burro!')
}
if(won){
  Alert.alert('parabens', 'você e campeão!')
}
this.setState({ board, lost, won})
}

onSelectField = (row, column ) => {
  const board = cloneBoard(this.state.board)
  inverteFlag(board, row, column)
  const won = wonGame(board)
  if (won){
    Alert.alert('parabens ','voce venceu')
  }
  this.setState({board, won})
}
onLevelSelected = level => {
params.difficultLevel = level
this.setState(this.createState())
}
render() {
    return (
      <View style style={styles.container}>
        <SelecioneONivel isVisible={this.state.showLevelSelection}
        onLevelSelected={this.onLevelSelected}
        onCancel={() => this.setState({showLevelSelection: false}) }/>
        <Header flagsLeft={this.minesAmount()- bandeiraUsed(this.state.board)}
        onNewGame={() => this.setState(this.createState())}
         onFlagPress={() => this.setState({ showLevelSelection: true})}/>
      <View style={styles.board}>

    <MineField board = {this.state.board}
    onOpenField={this.onOpenField}
    onSelectField={this.onSelectField} />
    </View>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'flex-end'
 },
 board: {
   alignItems: 'center',
   backgroundColor: '#AAA'
 }
});




