import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import _ from 'lodash';
import Workbook from 'react-excel-workbook'
import './navbar.css';

class Navbar extends Component {

  constructor() {
    super();
    this.state = {
      isTakip: [],
    }
  }

  componentDidMount() {
    let app = firebase.database().ref('yemekTakip');
    app.on('value', snapshot => {
      this.getData(snapshot.val());
    });
  }

  componentWillUnmount() {
    firebase.database().ref('yemekTakip').off('value');
  }

  getData(values) {
    let isTakipVal = values;
    let isTakip = _(isTakipVal)
      .keys()
      .map(isTakipKey => {
        let cloned = _.clone(isTakipVal[isTakipKey]);
        cloned.key = isTakipKey;
        return cloned;
      })
      .value();
    isTakip = isTakip.reverse().sort((a, b) => Intl.Collator("tr").compare(b.isTakip, a.isTakip));
    this.setState({
      isTakip: isTakip.reverse()
    });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/">
            <h6 className="navbar-brand">Yemek Takip</h6>
          </Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
            </ul>
          </div>

          <div className="row text-center" style={{ }}>
            <Workbook filename="yemekTakip.xlsx" element={<button className="btn btn-outline-success excel-btn">Excel<i class="material-icons">
            get_app
            </i></button>}>
              <Workbook.Sheet data={this.state.isTakip} name="Sheet A" >
                <Workbook.Column label="Lokasyon" value="lokasyon" />
                <Workbook.Column label="Tarih" value="tarih" />
                <Workbook.Column label="Toplam" value="toplam" />
                <Workbook.Column label="Kahvaltı Saat" value="kahvaltiSaat" />
                <Workbook.Column label="Kahvaltı Adet" value="yasin" />
                <Workbook.Column label="Öğlen Saat" value="oglenSaat" />
                <Workbook.Column label="Öğlen Adet" value="oglenAdet" />
                <Workbook.Column label="İkindi Saat" value="ikindiSaat" />
                <Workbook.Column label="İkindi Adet" value="ikindiAdet" />
                <Workbook.Column label="Akşam Saat" value="aksamSaat" />
                <Workbook.Column label="Akşam Adet" value="aksamAdet" />
                <Workbook.Column label="Gece Saat" value="geceSaat" />
                <Workbook.Column label="Gece Adet" value="geceAdet" />
                <Workbook.Column label="Gece Ara Saat" value="geceAraSaat" />
                <Workbook.Column label="Gece Ara Adet" value="geceAraAdet" />
              </Workbook.Sheet>
            </Workbook>
          </div>

        </div>
      </nav>
    );
  }
}

export default Navbar;
