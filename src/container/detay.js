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
      toplam: '',
      kahvaltiSaat: moment(),
    //  kahvaltiAdet: '',
      yasin: '',
      oglenSaat: moment(),
      oglenAdet: '',
      ikindiSaat: moment(),
      ikindiAdet: '',
      aksamSaat: moment(),
      aksamAdet: '',
      geceSaat: moment(),
      geceAdet: '',
      geceAraSaat: moment(),
      geceAraAdet: '',
    }
  }

  componentWillMount() {

    const item = this.props.history.location.state.isTakipler

    this.setState({ lokasyon: item.lokasyon })
    this.setState({ tarih: moment(item.tarih, '"DD-MM-YYYY"') })
    this.setState({ toplam: item.toplam })

    this.setState({ kahvaltiSaat: moment(item.kahvaltiSaat, 'hh:mm') })
    this.setState({ oglenSaat: moment(item.oglenSaat, 'hh:mm') })
    this.setState({ ikindiSaat: moment(item.ikindiSaat, 'hh:mm') })
    this.setState({ aksamSaat: moment(item.aksamSaat, 'hh:mm') })
    this.setState({ geceSaat: moment(item.geceSaat, 'hh:mm') })
    this.setState({ geceAraSaat: moment(item.geceAraSaat, 'hh:mm') })

    this.setState({ yasin: item.yasin })

    //this.setState({ kahvaltiAdet: item.kahvaltiAdet })
    this.setState({ oglenAdet: item.oglenAdet })
    this.setState({ ikindiAdet: item.ikindiAdet })
    this.setState({ aksamAdet: item.aksamAdet })
    this.setState({ geceAdet: item.geceAdet })
    this.setState({ geceAraAdet: item.geceAraAdet })


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

  delete = (key) => {
    firebase.database().ref('yemekTakip').child(key).remove();
    this.props.history.push('/');
  }

  edit = (key) => {

    const s1 = this.state.yasin;
    const s2 = this.state.oglenAdet;
    const s3 = this.state.ikindiAdet;
    const s4 = this.state.aksamAdet;
    const s5 = this.state.geceAdet;
    const s6 = this.state.geceAraAdet;

    const top = parseInt(s1)+parseInt(s2)+parseInt(s3)+parseInt(s4)+parseInt(s5)+parseInt(s6);

    const dbRef = firebase.database().ref('yemekTakip').child(key);
    const gelecekTarih = this.state.tarih
    const gkahvaltiSaat = this.state.kahvaltiSaat
    const goglenSaat = this.state.oglenSaat
    const gikindiSaat = this.state.ikindiSaat
    const gaksamSaat = this.state.aksamSaat
    const ggeceSaat = this.state.geceSaat
    const ggeceAraSaat = this.state.geceAraSaat

    dbRef.update({
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
     // kahvaltiAdet: trim(this.state.kahvaltiAdet),
      oglenAdet: trim(this.state.oglenAdet),
      ikindiAdet: trim(this.state.ikindiAdet),
      aksamAdet: trim(this.state.aksamAdet),
      geceAdet: trim(this.state.geceAdet),
      geceAraAdet: trim(this.state.geceAraAdet),
    })
  }



  render() {
    const item = this.props.history.location.state.isTakipler
    const tarihg = this.state.tarih

    const gkahvaltiSaat = this.state.kahvaltiSaat
    const goglenSaat = this.state.oglenSaat
    const gikindiSaat = this.state.ikindiSaat
    const gaksamSaat = this.state.aksamSaat
    const ggeceSaat = this.state.geceSaat
    const ggeceAraSaat = this.state.geceAraSaat

    const cevir = new Intl.DateTimeFormat('tr-TR', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(tarihg);

    const cevirkahvaltiSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gkahvaltiSaat);
    const ceviroglenSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(goglenSaat);
    const cevirikindiSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gikindiSaat);
    const ceviraksamSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(gaksamSaat);
    const cevirgeceSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(ggeceSaat);
    const cevirgeceAraSaat = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' }).format(ggeceAraSaat);


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
            <td className="basliklar">Toplam</td>
            <td>{this.state.toplam}</td>
          </tr>
            <tr>
              <td className="basliklar">Kahvaltı Saati</td>
              <td>{cevirkahvaltiSaat}</td>
            </tr>
            <tr>
              <td className="basliklar">Kahvaltı Adeti</td>
              <td>{this.state.yasin}</td>
            </tr>
            <tr>
              <td className="basliklar">Öğle Yemek Saati</td>
              <td>{ceviroglenSaat}</td>
            </tr>
            <tr>
            <td className="basliklar">Öğle Yemek Adeti</td>
            <td>{this.state.oglenAdet}</td>
          </tr>
            <tr>
              <td className="basliklar">İkindi Yemek Saati</td>
              <td>{cevirikindiSaat}</td>
            </tr>
            <tr>
            <td className="basliklar">İkindi Yemek Adeti</td>
            <td>{this.state.ikindiAdet}</td>
          </tr>
            <tr>
              <td className="basliklar">Akşam Yemek Saati</td>
              <td>{ceviraksamSaat}</td>
            </tr>
            <tr>
            <td className="basliklar">Akşam Yemek Adeti</td>
            <td>{this.state.aksamAdet}</td>
          </tr>
            <tr>
              <td className="basliklar">Gece Yemek Saati</td>
              <td>{cevirgeceSaat}</td>
            </tr>
            <tr>
            <td className="basliklar">Gece Yemek Adeti</td>
            <td>{this.state.geceAdet}</td>
          </tr>
            <tr>
              <td className="basliklar">Gece Ara Öğün Saati</td>
              <td>{cevirgeceAraSaat}</td>
            </tr>
            <tr>
            <td className="basliklar">Gece Ara Öğün Adeti</td>
            <td>{this.state.geceAraAdet}</td>
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
          <select  className="form-control text" defaultValue={this.state.lokasyon} onChange={this.lokasyonOnChange} >
          <option value="Beylükdüzü">Beylükdüzü</option>
          <option value="Kıraç">Kıraç</option>
          </select>

            <label className="yazi">Kahvaltı Adet</label>
            <input type="number"
            onChange={this.yasinOnChange}
            className="form-control text"
            defaultValue={this.state.yasin}
          />


            <label className="yazi">Öğle Yemek Adeti</label>
            <input type="number"
            onChange={this.oglenAdetOnChange}
            className="form-control text"
            defaultValue={this.state.oglenAdet}
          />

            <label className="yazi">İkindi Yemek Adeti</label>
            <input type="number"
              onChange={this.ikindiAdetOnChange}
              className="form-control text"
              defaultValue={this.state.ikindiAdet}
            />

            <label className="yazi">Akşam Yemek Adeti</label>
            <input type="number"
            onChange={this.aksamAdetOnChange}
            className="form-control text"
            defaultValue={this.state.aksamAdet}
          />
            
          <label className="yazi">Gece Yemek Adeti</label>
          <input type="number"
          onChange={this.geceAdetOnChange}
          className="form-control text"
          defaultValue={this.state.geceAdet}
        />

        <label className="yazi">Gece Ara Öğün Adeti</label>
        <input type="yazi"
        onChange={this.geceAraAdetOnChange}
        className="form-control text"
        defaultValue={this.state.geceAraAdet}
      />


          </div>
        </div>
        </Modal>

      </div>
    );
  }
}

export default withAlert(Detay);
