import React, { Component } from 'react';
import firebase from 'firebase';
import trim from 'trim';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Modal from 'react-modal';
import 'react-datepicker/dist/react-datepicker.css';
import { withAlert } from 'react-alert';
import { Link } from 'react-router-dom';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
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
      modalIsOpen: false,
      kahvaltiToplam: '0',
      yemekToplam: '0',
      kahvaltiSaat: '',
      yasin: '0',
      oglenSaat: '',
      oglenAdet: '0',
      ikindiSaat: '',
      ikindiAdet: '0',
      aksamSaat: '',
      aksamAdet: '0',
      geceSaat: '',
      geceAdet: '0',
      kahvaltiTostAdet: '0',
    }
  }

  componentWillMount() {

    const item = this.props.history.location.state.isTakipler

    this.setState({ lokasyon: item.lokasyon })
    this.setState({ tarih: moment(item.tarih, '"DD-MM-YYYY"') })
    this.setState({ kahvaltiToplam: item.kahvaltiToplam })
    this.setState({ yemekToplam: item.yemekToplam })

    this.setState({ kahvaltiSaat: item.kahvaltiSaat })
    this.setState({ oglenSaat: item.oglenSaat })
    this.setState({ ikindiSaat: item.ikindiSaat })
    this.setState({ aksamSaat: item.aksamSaat })
    this.setState({ geceSaat: item.geceSaat })

    this.setState({ yasin: item.yasin })
    this.setState({ oglenAdet: item.oglenAdet })
    this.setState({ ikindiAdet: item.ikindiAdet })
    this.setState({ aksamAdet: item.aksamAdet })
    this.setState({ geceAdet: item.geceAdet })
    this.setState({ kahvaltiTostAdet: item.kahvaltiTostAdet })


  }

  lokasyonOnChange = (e) => {
    this.setState({ lokasyon: e.target.value })
  }
  tarihOnChange = (data) => {
    this.setState({ tarih: data })
  }
  kahvaltiSaatOnChange = (e) => {
    this.setState({ kahvaltiSaat: e.target.value })
  }
  oglenSaatOnChange = (e) => {
    this.setState({ oglenSaat: e.target.value })
  }
  ikindiSaatOnChange = (e) => {
    this.setState({ ikindiSaat: e.target.value })
  }
  aksamSaatOnChange = (e) => {
    this.setState({ aksamSaat: e.target.value })
  }
  geceSaatOnChange = (e) => {
    this.setState({ geceSaat: e.target.value })
  }

  yasinOnChange = (e) => {
    this.setState({ yasin: e.target.value })
  }
  oglenAdetOnChange = (e) => {
    this.setState({ oglenAdet: e.target.value })
  }
  ikindiAdetOnChange = (e) => {
    this.setState({ ikindiAdet: e.target.value })
  }
  aksamAdetOnChange = (e) => {
    this.setState({ aksamAdet: e.target.value })
  }
  geceAdetOnChange = (e) => {
    this.setState({ geceAdet: e.target.value })
  }
  kahvaltiTostAdetOnChange = (e) => {
    this.setState({ kahvaltiTostAdet: e.target.value })
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

    const kKahvaltiAdet = this.state.yasin;
    const yOglenAdet = this.state.oglenAdet;
    const kikindiAdet = this.state.ikindiAdet;
    const yAksamAdet = this.state.aksamAdet;
    const yGeceAdet = this.state.geceAdet;
    const kKahvaltiTost = this.state.kahvaltiTostAdet;

    const kahvaltiTop = parseInt(kKahvaltiAdet) + parseInt(kikindiAdet) + parseInt(kKahvaltiTost);
    const yemekTop = parseInt(yOglenAdet) + parseInt(yAksamAdet) + parseInt(yGeceAdet);

    const dbRef = firebase.database().ref('yemekTakip').child(key);
    const gelecekTarih = this.state.tarih
    dbRef.update({
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      kahvaltiToplam: trim("" + kahvaltiTop),
      yemekToplam: trim("" + yemekTop),

      kahvaltiSaat: trim(this.state.kahvaltiSaat),
      oglenSaat: trim(this.state.oglenSaat),
      ikindiSaat: trim(this.state.ikindiSaat),
      aksamSaat: trim(this.state.aksamSaat),
      geceSaat: trim(this.state.geceSaat),

      yasin: trim(this.state.yasin),
      oglenAdet: trim(this.state.oglenAdet),
      ikindiAdet: trim(this.state.ikindiAdet),
      aksamAdet: trim(this.state.aksamAdet),
      geceAdet: trim(this.state.geceAdet),
      kahvaltiTostAdet: trim(this.state.kahvaltiTostAdet),
    })
  }

  render() {
    const kKahvaltiAdet = this.state.yasin;
    const yOglenAdet = this.state.oglenAdet;
    const kikindiAdet = this.state.ikindiAdet;
    const yAksamAdet = this.state.aksamAdet;
    const yGeceAdet = this.state.geceAdet;
    const kKahvaltiTost = this.state.kahvaltiTostAdet;
    const kahvaltiTop = parseInt(kKahvaltiAdet) + parseInt(kikindiAdet) + parseInt(kKahvaltiTost);
    const yemekTop = parseInt(yOglenAdet) + parseInt(yAksamAdet) + parseInt(yGeceAdet);

    const item = this.props.history.location.state.isTakipler
    const tarihg = this.state.tarih
    const cevir = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(tarihg);
    return (
      <div>
        <table className="table table-striped">
          <tbody>
            <tr>
              <td> <Link to="/"><button className="btn btn-outline-secondary btnler-detay"><i className="material-icons gr">keyboard_backspaces</i>  Geri</button> </Link> </td>
              <td className="btn-detay"><button onClick={this.openModal} className="btn btn-outline-info btnler-detay2">Düzenle <i className="material-icons">edit</i></button><button type="button" onClick={() => this.delete(item.key)} class="btn btn-outline-danger btnler-detay">Sil <i className="material-icons">delete_forever</i></button></td>
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
              <td className="basliklar">Kavhaltı Toplam Adet</td>
              <td>{kahvaltiTop}</td>
            </tr>
            <tr>
              <td className="basliklar">Yemek Toplam Adet</td>
              <td>{yemekTop}</td>
            </tr>
            <tr>
              <td className="basliklar">Kahvaltı Saati</td>
              <td>{this.state.kahvaltiSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">Kahvaltı Adeti</td>
              <td>{this.state.yasin}</td>
            </tr>
            <tr>
              <td className="basliklar">Öğle Yemek Saati</td>
              <td>{this.state.oglenSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">Öğle Yemek Adeti</td>
              <td>{this.state.oglenAdet}</td>
            </tr>
            <tr>
              <td className="basliklar">İkindi Yemek Saati</td>
              <td>{this.state.ikindiSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">İkindi Yemek Adeti</td>
              <td>{this.state.ikindiAdet}</td>
            </tr>
            <tr>
              <td className="basliklar">Akşam Yemek Saati</td>
              <td>{this.state.aksamSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">Akşam Yemek Adeti</td>
              <td>{this.state.aksamAdet}</td>
            </tr>
            <tr>
              <td className="basliklar">Gece Yemek Saati</td>
              <td>{this.state.geceSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">Gece Yemek Adeti</td>
              <td>{this.state.geceAdet}</td>
            </tr>
            <tr>
              <td className="basliklar">Kavhaltı Tost Adeti</td>
              <td>{this.state.kahvaltiTostAdet}</td>
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
            <div className="div">
              <label className="yazi">Tarih</label>
              <DatePicker
                className="form-control text"
                selected={this.state.tarih}
                onChange={this.tarihOnChange}
                dateFormat="DD/MM/YYYY"
              />

              <label className="yazi">Kahvaltı Saati</label>
              <input type="text"
                defaultValue={this.state.kahvaltiSaat}
                onChange={this.kahvaltiSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Öğle Yemek Saati</label>
              <input type="text"
                defaultValue={this.state.oglenSaat}
                onChange={this.oglenSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">İkindi Yemek Saati</label>
              <input type="text"
                defaultValue={this.state.ikindiSaat}
                onChange={this.ikindiSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Akşam Yemek Saati</label>
              <input type="text"
                defaultValue={this.state.aksamSaat}
                onChange={this.aksamSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Gece Yemek Saati</label>
              <input type="text"
                defaultValue={this.state.geceSaat}
                onChange={this.geceSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Kahvaltı Tost Adeti</label>
              <input type="number"
                defaultValue={this.state.kahvaltiTostAdet}
                onChange={this.kahvaltiTostAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />
              <button
                className="btn"
                onClick={() => {
                  this.edit(item.key);
                  this.closeModal()
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
            <div className="div">
              <label className="yazi">Lokasyon</label>
              <select className="form-control text" defaultValue={this.state.lokasyon} onChange={this.lokasyonOnChange} >
                <option value="Beylükdüzü">Beylükdüzü</option>
                <option value="Kıraç">Kıraç</option>
              </select>

              <label className="yazi">Kahvaltı Adeti</label>
              <input type="number"
                defaultValue={this.state.yasin}
                onChange={this.yasinOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />

              <label className="yazi">Öğle Yemek Adeti</label>
              <input type="number"
                defaultValue={this.state.oglenAdet}
                onChange={this.oglenAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />

              <label className="yazi">İkindi Yemek Adeti</label>
              <input type="number"
                defaultValue={this.state.ikindiAdet}
                onChange={this.ikindiAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />

              <label className="yazi">Akşam Yemek Adeti</label>
              <input type="number"
                defaultValue={this.state.aksamAdet}
                onChange={this.aksamAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />

              <label className="yazi">Gece Yemek Adeti</label>
              <input type="number"
                defaultValue={this.state.geceAdet}
                onChange={this.geceAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default withAlert(Detay);
