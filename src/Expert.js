import React, { Component } from 'react';
import { times } from 'lodash';

class Expert extends Component {
  state = {
    characteristicsCount: 0,
    objectsCount: 0,
    characteristics: [],
    objects: [],
    matrix: [],
  }

  createEmptyMatrix = (row, col) => {
    return Array(row).fill(Array(col).fill(0));
  }

  onMatrixChange = (row, column, e) => {
    const copy = [].concat(this.state.matrix);
    copy[row][column] = Number(e.target.checked);
    this.setState({ matrix: copy });
  }

  onCharacteristicsCountChange = (e) => {
    const diff = this.state.characteristicsCount - e.target.value;
    if (diff < 0) {
      let copy = [].concat(this.state.matrix);
      for (let i = 0; i < Math.abs(diff); i++) {
        copy.push(Array(this.state.objectsCount).fill(0));
      }
      this.setState({ characteristicsCount: Number(e.target.value), matrix: copy });
    }
    if (diff > 0) {
      let copy = [].concat(this.state.matrix);
      for (let i = 0; i < Math.abs(diff); i++) {
        copy.pop();
      }
      this.setState({ characteristicsCount: Number(e.target.value), matrix: copy });
    }
    return;
  }

  addCharacteristics = (e, index) => {
    let copy = this.state.characteristics;
    copy[index] = e.target.value;
    this.setState({ characteristics: copy });
  }

  renderCharacteristicsForm = () => {
    let characteristicsInputs = [];
    for (let i = 0; i < this.state.characteristicsCount; i++) {
      characteristicsInputs.push(
        <input
          key={`characteristics${i}`}
          type='text'
          className='characteristics'
          defaultValue=''
          placeholder={`Введите характеристику ${i}`}
          onChange={(e) => this.addCharacteristics(e, i)}
        />
      );
      characteristicsInputs.push(<br />);
    }
    return characteristicsInputs;
  }

  onObjectsCountChange = (e) => {
    const diff = this.state.objectsCount - e.target.value;
    if (diff < 0) {
      let copy = [].concat(this.state.matrix);
      copy.map(arr => arr.push(0));
      this.setState({ objectsCount: Number(e.target.value), matrix: copy });
    }
    if (diff > 0) {
      let copy = [].concat(this.state.matrix);
      copy.map(arr => arr.pop());
      this.setState({ objectsCount: Number(e.target.value), matrix: copy });
    }
  }

  addObjects = (e, index) => {
    let copy = this.state.objects;
    copy[index] = e.target.value;
    this.setState({ objects: copy });
  }

  renderObjectsForm = () => {
    let objectsInputs = [];
    for (let i = 0; i < this.state.objectsCount; i++) {
      objectsInputs.push(
        <input
          key={`objects${i}`}
          type='text'
          className='objects'
          defaultValue=''
          placeholder={`Введите объект ${i}`}
          onChange={(e) => this.addObjects(e, i)}
        />
      );
      objectsInputs.push(<br />);
    }
    return objectsInputs;
  }

  renderMatrixRowInputs = (rowIndex) => {
    let objectsInputs = [];
    for (let i = 0; i < this.state.objectsCount; i++) {
      objectsInputs.push(
        <td>
          <input
            key={`matrix${rowIndex}${i}`}
            type='checkbox'
            onClick={(e) => this.onMatrixChange(rowIndex, i, e)}
          />
        </td>
      );
    }
    return objectsInputs;
  }

  renderMatrixRow = (rowIndex) => {
    return (
      <tr>
        <td>{this.state.characteristics[rowIndex]}</td> {this.renderMatrixRowInputs(rowIndex)}
      </tr>
    )
  }

  renderMatrix = () => {
    let objectsInputs = [];
    objectsInputs.push(<tr><th />{this.state.objects.map(el => <th> {el} </th>)}</tr>)
    for (let i = 0; i < this.state.characteristicsCount; i++) {
      objectsInputs.push(this.renderMatrixRow(i));
    }
    return objectsInputs;
  }

  complete = () => this.props.completeExpertMode(this.state);

  render() {
    const characteristicsInputs = [];
    return (
      <div>
        Введите количество характеристик
        <input
          type='number'
          className='characteristicsCount'
          defaultValue='0'
          onChange={this.onCharacteristicsCountChange}
        />
        <br />
        {this.renderCharacteristicsForm()}
        <br />
        Введите количество объектов
        <input
          type='number'
          className='characteristicsCount'
          defaultValue='0'
          onChange={this.onObjectsCountChange}
        />
        <br />
        {this.renderObjectsForm()}
        <br />
        <table>
        {this.renderMatrix()}
        </table>
        <br />
        <button onClick={this.complete}>complete</button>
      </div>
    );
  }
}

export default Expert;
