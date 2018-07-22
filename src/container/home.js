import React, { Component } from 'react';
import firebase from 'firebase';
import trim from 'trim';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { withAlert } from 'react-alert';
import List from './list';
import './home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

class Home extends Component {
  constructor() {
    super();


    this.state = {
      lokasyon: 'Beylükdüzü',
      tarih: moment(),
      adet: '',
      modalIsOpen: false,
    }
  }

  tarihOnChange = (data) => {
    this.setState({ tarih: data })
  }

  lokasyonOnChange = (e) => {
    this.setState({ lokasyon: e.target.value })
  }

  adetOnChange = (e) => {
    this.setState({ adet: e.target.value })
  }

  openModal = () => {
    this.setState({ modalIsOpen: true });
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  }

  uyari = () => {
    return this.props.alert.error(

      <div>
        <label>Formdan Çıkmak İstedinize Emin Misiniz ?  </label>
        <div >
          <button className="btn btnler evet" onClick={this.closeModal}>EVET</button>
        </div>
      </div>
    )
  }

  kaydet = () => {
    const dbRef = firebase.database().ref('yemekTakip');
    const gelecekTarih = this.state.tarih
    dbRef.push({
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      lokasyon: trim(this.state.lokasyon),
      adet: trim(this.state.adet),
    })
  }

  render() {
    return (
      <div>
        <div>
          <List />
          <div>
            <div className="faba"><Button className="home-btn" variant="fab" color="secondary" aria-label="add" onClick={this.openModal} >
              <AddIcon />
            </Button></div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.uyari}
              style={customStyles}
              contentLabel="Example Modal"
            >

              <div className="baslık"> Yemek Takip Formu </div>

              <div className="ana_div">
                <div className="divler">

                  <label className="yazi">Lokasyon</label>
                  <select className="form-control text" value={this.state.lokasyon} onChange={this.lokasyonOnChange}>
                    <option value="Beylükdüzü" >Beylükdüzü</option>
                    <option value="Kıraç" >Kıraç</option>
                  </select>

                  <label className="yazi">Tarih</label>
                  <DatePicker
                    className="form-control text"
                    selected={this.state.tarih}
                    onChange={this.tarihOnChange}
                    dateFormat="DD/MM/YYYY"
                  />

                  <label className="yazi">Adet</label>
                  <input type="text"
                    onChange={this.adetOnChange}
                    className="form-control text"
                  />

                  <button
                    className="btn btn3"
                    onClick={() => {
                      this.kaydet();
                      this.closeModal();
                    }}
                  >
                    Kaydet
                  </button>
                  <button
                    className="btn btn2"
                    onClick={() => {
                      this.closeModal()
                    }}
                  >
                    Vazgeç
                  </button>

                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default withAlert(Home);
