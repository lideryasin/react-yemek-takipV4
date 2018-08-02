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
      toplam:'',
      modalIsOpen: false,
      kahvaltiSaat: moment(),
      yasin: '0',
     // kahvaltiAdet: '',
      oglenSaat: moment(),
      oglenAdet: '0',
      ikindiSaat: moment(),
      ikindiAdet:'0',
      aksamSaat: moment(),
      aksamAdet: '0',
      geceSaat: moment(),
      geceAdet: '0',
      geceAraSaat: moment(),
      geceAraAdet: '0',
    }
  }

  lokasyonOnChange = (e) => {
    this.setState({ lokasyon: e.target.value })
  }
  toplamOnChange = (e) => {
    this.setState({ toplam: e.target.value })
  }
  tarihOnChange = (data) => {
    this.setState({ tarih: data })
  }
  kahvaltiSaatOnChange = (data) => {
    this.setState({ kahvaltiSaat: data })
  }
  oglenSaatOnChange = (data) => {
    this.setState({ oglenSaat: data })
  }
  ikindiSaatOnChange = (data) => {
    this.setState({ ikindiSaat: data })
  }
  aksamSaatOnChange = (data) => {
    this.setState({ aksamSaat: data })
  }
  geceSaatOnChange = (data) => {
    this.setState({ geceSaat: data })
  }
  geceAraSaatOnChange = (data) => {
    this.setState({ geceAraSaat: data })
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
  geceAraAdetOnChange = (e) => {
    this.setState({ geceAraAdet: e.target.value })
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

    const s1 = this.state.yasin;
    const s2 = this.state.oglenAdet;
    const s3 = this.state.ikindiAdet;
    const s4 = this.state.aksamAdet;
    const s5 = this.state.geceAdet;
    const s6 = this.state.geceAraAdet;

    const top = parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5)+parseInt(s6);

    const dbRef = firebase.database().ref('yemekTakip');
    const gelecekTarih = this.state.tarih
    const gkahvaltiSaat = this.state.kahvaltiSaat
    const goglenSaat = this.state.oglenSaat
    const gikindiSaat = this.state.ikindiSaat
    const gaksamSaat = this.state.aksamSaat
    const ggeceSaat = this.state.geceSaat
    const ggeceAraSaat = this.state.geceAraSaat


    dbRef.push({
      tarih: trim("" + new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(gelecekTarih)),
      lokasyon: trim(this.state.lokasyon),
      toplam: trim(""+top),

      kahvaltiSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gkahvaltiSaat)),
      oglenSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(goglenSaat)),
      ikindiSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gikindiSaat)),
      aksamSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gaksamSaat)),
      geceSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(ggeceSaat)),
      geceAraSaat: trim("" + new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(ggeceAraSaat)),

      yasin: trim(this.state.yasin),
      oglenAdet: trim(this.state.oglenAdet),
      ikindiAdet: trim(this.state.ikindiAdet),
      aksamAdet: trim(this.state.aksamAdet),
      geceAdet: trim(this.state.geceAdet),
      geceAraAdet: trim(this.state.geceAraAdet),
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
            
            <div className="loka-orta">
     
            </div>
            
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
                <TimePicker
                showSecond={false}
                defaultValue={this.state.kahvaltiSaat}
                onChange={this.kahvaltiSaatOnChange}
                className="form-control text"
              />,

           
                <label className="yazi">Öğle Yemek Saati</label>
                <TimePicker
                showSecond={false}
                defaultValue={this.state.oglenSaat}
                onChange={this.oglenSaatOnChange}
                className="form-control text"
              />,

                <label className="yazi">İkindi Yemek Saati</label>
                <TimePicker
                showSecond={false}
                defaultValue={this.state.ikindiSaat}
                onChange={this.ikindiSaatOnChange}
                className="form-control text"
              />


                <label className="yazi">Akşam Yemek Saati</label>
                <TimePicker
                showSecond={false}
                defaultValue={this.state.aksamSaat}
                onChange={this.aksamSaatOnChange}
                className="form-control text"
              />

              <label className="yazi">Gece Yemek Saati</label>
              <TimePicker
              showSecond={false}
              defaultValue={this.state.geceSaat}
              onChange={this.geceSaatOnChange}
              className="form-control text"
            />

            <label className="yazi">Gece Ara Öğün Saati</label>
            <TimePicker
            showSecond={false}
            defaultValue={this.state.geceAraSaat}
            onChange={this.geceAraSaatOnChange}
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

            <label className="yazi">Gece Ara Öğün Adeti</label>
            <input type="number"
            onChange={this.geceAraAdetOnChange}
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
