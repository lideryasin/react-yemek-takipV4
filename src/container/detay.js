import React, { Component } from 'react';
import firebase from 'firebase';
import trim from 'trim';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import './detay.css';


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

class Detay extends Component {


  constructor() {
    super();

    this.state = {
      lokasyon: '',
      tarih: moment().format('L'),
      adet: '',
      modalIsOpen: false,
      yasin: []
    }
  }

  componentWillMount() {

    const item = this.props.history.location.state.isTakipler

    this.setState({ adet: item.adet })
    this.setState({ lokasyon: item.lokasyon })
    this.setState({ tarih: moment(item.tarih, '"DD-MM-YYYY"') })
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

  delete = (key) => {
    firebase.database().ref('yemekTakip').child(key).remove();
    this.props.history.push('/');
  }

  edit = (key) => {
    const dbRef = firebase.database().ref('yemekTakip').child(key);
    const gelecekTarih = this.state.tarih
    dbRef.update({
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      lokasyon: trim(this.state.lokasyon),
      adet: trim(this.state.adet),
    })
  }

  geri = () => {

  }


  render() {
    const item = this.props.history.location.state.isTakipler
    //   console.log(moment(item.tarih, '"DD-MM-YYYY"')._i)

    const tarihg = this.state.tarih
    const cevir = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(tarihg);

    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr className="tr-detay">
              <td><div className="gr"><Link to="/"><button onClick={this.geri} class="btn btn-outline-secondary"><i class="material-icons gr">
                keyboard_backspaces
              </i>Geri</button></Link></div> </td>
              <td className="btn-detay"> <button onClick={this.openModal} type="button" className="btn btn-outline-info">Düzenle<i className="material-icons dzn">
                edit
            </i></button> <button type="button" onClick={() => this.delete(item.key)} className="btn btn-outline-danger">Sil<i className="material-icons md-48 red65">
                  delete_forever
            </i></button> </td>
            </tr>
            <tr>
              <td className="basliklar">Lokasyon</td>
              <td>{this.state.lokasyon}</td>
            </tr>
            <tr>
              <td className="basliklar">Tarih</td>
              <td>{cevir}</td>
            </tr>
            <tr>
              <td className="basliklar">Adet</td>
              <td>{this.state.adet}</td>
            </tr>
          </tbody>
        </table>

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
              <select className="form-control text" defaultValue={item.lokasyon} onChange={this.lokasyonOnChange}>
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
                defaultValue={item.adet}
              />

              <button
                className="btn btn3"
                onClick={() => {
                  this.edit(item.key);
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
    );
  }
}

export default withAlert(Detay);
