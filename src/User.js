import React, { Component } from 'react';

class User extends Component {
  constructor(props){
    super(props);
    const characteristics = [].concat(this.props.expertModeInfo.characteristics);
    const matrix = this.props.expertModeInfo.matrix.filter(
      (arr, index) => {
        if (!arr.includes(1)) {
          characteristics.splice(index, 1);
        }
        return arr.includes(1);
      });
    this.state = {
      matrix,
      characteristics,
      objects: [].concat(this.props.expertModeInfo.objects),
    };
  }

  rowSumm = (arr) => {
    if (!arr) return;
    console.log('row: ', arr);
    return arr.reduce((a, b) => a + b);
  }

  min = (arr) => {
    return arr.reduce((a,b) => Math.min(a,b));
  }

  findFirsMinRow = () => {
    // console.log('m: ', this.state.matrix);
    const rowsSumm = this.state.matrix.map(row => this.rowSumm(row));

    return rowsSumm.indexOf(this.min(rowsSumm));
  }

  takeAnswer = (e, firstMinRow) => {
    e.target.value === 'да'
    ? this.excludeAllNegative(firstMinRow)
    : this.excludeAllPositive(firstMinRow);
  }

  excludeAllPositive = (firstMinRow) => {
    let copy = [].concat(this.state.matrix);
    let indexes = copy[firstMinRow].map((el, i) => {
      if (el == 0) {
        return;
      }
      return i;
    })
    indexes = indexes.filter(el => el !== undefined);
    const newArr = copy.map(row => {
      indexes.forEach(i => row[i] = -1);
      return row.filter(el => el >= 0);
    });
    newArr.splice(firstMinRow, 1);
    let copyObjects = [].concat(this.state.objects);
    indexes.forEach(i => copyObjects[i] = -1);
    let newObjects = copyObjects.filter(el => el !== -1);
    let newCharact = [].concat(this.state.characteristics);
    newCharact.splice(firstMinRow, 1);
    this.setState({ matrix: newArr, objects: newObjects, characteristics: newCharact });
  }

  excludeAllNegative = (firstMinRow) => {
    let copy = [].concat(this.state.matrix);
    let indexes = copy[firstMinRow].map((el, i) => {
      if (el !== 0) {
        return;
      }
      return i;
    })
    indexes = indexes.filter(el => el !== undefined);
    const newArr = copy.map(row => {
      indexes.forEach(i => row[i] = -1);
      return row.filter(el => el >= 0);
    });
    newArr.splice(firstMinRow, 1);
    let copyObjects = [].concat(this.state.objects);
    indexes.forEach(i => copyObjects[i] = -1);
    let newObjects = copyObjects.filter(el => el !== -1);
    let newCharact = [].concat(this.state.characteristics).splice(firstMinRow, 1);
    newCharact.splice(firstMinRow, 1);
    this.setState({ matrix: newArr, objects: newObjects, characteristics: newCharact });
  }

  render() {
    const firstMinRow = this.findFirsMinRow();
    const isComplete = this.state.objects.length <= 1;
    return (
      <div>
        {`Есть ли объекта ${this.state.characteristics[firstMinRow]} ?`}
        <input
          type='text'
          onKeyDown={(e) => e.key === 'Enter' && this.takeAnswer(e, firstMinRow)}
        />
        {isComplete && this.state.objects.length === 1
          ? `Это ${this.state.objects[0]}`
          : 'Не найдено'}
      </div>
    );
  }
}

export default User;
