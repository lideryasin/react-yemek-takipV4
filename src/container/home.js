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
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
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
      kahvaltiToplam:'0',
      yemekToplam: '0',
      modalIsOpen: false,
      kahvaltiSaat: '03:30 - 05:30',
      yasin: '0',
     // kahvaltiAdet: '',
      oglenSaat: '11:30 - 13:30',
      oglenAdet: '0',
      ikindiSaat: '16:30 - 18:30',
      ikindiAdet:'0',
      aksamSaat: '18:30 - 21:30',
      aksamAdet: '0',
      geceSaat: '00:00 - 01:45',
      geceAdet: '0',
      kahvaltiTostAdet: '0',
    }
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

  /*kahvaltiAdetOnChange = (e) => {
    this.setState({ KahvaltiAdet : e.target.value })
  }*/

  yasinOnChange = (e)=> {
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

  kaydet = () => {

    const kKahvaltiAdet = this.state.yasin;
    const yOglenAdet = this.state.oglenAdet;
    const kikindiAdet = this.state.ikindiAdet;
    const yAksamAdet = this.state.aksamAdet;
    const yGeceAdet = this.state.geceAdet;
    const kKahvaltiTost = this.state.kahvaltiTostAdet;

    const kahvaltiTop = parseInt(kKahvaltiAdet)+parseInt(kikindiAdet)+parseInt(kKahvaltiTost);
    const yemekTop = parseInt(yOglenAdet)+parseInt(yAksamAdet)+parseInt(yGeceAdet);

    const dbRef = firebase.database().ref('yemekTakip');
    const gelecekTarih = this.state.tarih
    dbRef.push({
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      lokasyon: trim(this.state.lokasyon),
      kahvaltiToplam: trim(""+kahvaltiTop),
      yemekToplam: trim(""+yemekTop),

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
    console.log(this.state)
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
                defaultValue="03:30 - 05:30" 
                onChange={this.kahvaltiSaatOnChange}
                className="form-control text"
              />

                <label className="yazi">Öğle Yemek Saati</label>
                <input type="text"
                defaultValue="11:30 - 13:30" 
                onChange={this.oglenSaatOnChange}
                className="form-control text"
              />

                <label className="yazi">İkindi Yemek Saati</label>
                <input type="text"
                defaultValue="16:30 - 18:30" 
                onChange={this.ikindiSaatOnChange}
                className="form-control text"
              />

                <label className="yazi">Akşam Yemek Saati</label>
               <input type="text"
                defaultValue="18:30 - 21:30" 
                onChange={this.aksamSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Gece Yemek Saati</label>
              <input type="text"
              defaultValue="00:00 - 01:45" 
              onChange={this.geceSaatOnChange}
              className="form-control text"
            />

            <label className="yazi">Kahvaltı Tost Adeti</label>
            <input type="number"
            onChange={this.kahvaltiTostAdetOnChange}
            placeholder="Lütfen Adet Yoksa Geçiniz"
            className="form-control text"
          />

                <button
                  className="btn"
                  onClick={() => {
                    this.kaydet();
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
              <select  className="form-control text" value={this.state.lokasyon} onChange={this.lokasyonOnChange} >
              <option value="Beylükdüzü">Beylükdüzü</option>
              <option value="Kıraç">Kıraç</option>
              </select>

                <label className="yazi">Kahvaltı Adeti</label>
               {/* <input type="text"
                onChange={this.kahvaltiAdetOnChange}
                className="form-control text"
              />*/}
              <input type="number"
              onChange={this.yasinOnChange}
              placeholder="Lütfen Adet Yoksa Geçiniz"
              className="form-control text"
              />

                <label className="yazi">Öğle Yemek Adeti</label>
                <input type="number"
                onChange={this.oglenAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />


                <label className="yazi">İkindi Yemek Adeti</label>
                <input type="number"
                  onChange={this.ikindiAdetOnChange}
                  placeholder="Lütfen Adet Yoksa Geçiniz"
                  className="form-control text"
                />

                <label className="yazi">Akşam Yemek Adeti</label>
                <input type="number"
                onChange={this.aksamAdetOnChange}
                placeholder="Lütfen Adet Yoksa Geçiniz"
                className="form-control text"
              />
                
              <label className="yazi">Gece Yemek Adeti</label>
              <input type="number"
              onChange={this.geceAdetOnChange}
              placeholder="Lütfen Adet Yoksa Geçiniz"
              className="form-control text"
            />

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
