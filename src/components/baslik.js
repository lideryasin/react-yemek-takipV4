import React, { Component } from 'react';
import './baslik.css';

class Baslik extends Component {
    render() {
        return (
            <div className="all">
            <div className="hepsi">
                <div className="">
                    <div className="row">
                        <div className="col-sm">
                            Lokasyon
                        </div>
                        <div className="col-sm">
                            Tarih
                          </div>
                        <div className="col-sm">
                            Toplam
                         </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

export default Baslik;
