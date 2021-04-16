const GunTable = {
  classes: {
    smg: {
      name: 'SMG',
      list: ['MAC-10', 'MP5', 'MP7', 'KRISS Vector'],
      guns: {
        mac10: {
          name: 'MAC-10',
          imgUrl: 'Img/MAC-10.png',
        },
        mp5: {
          name: 'MP5',
          imgUrl: 'Img/MP5.png',
        },
        mp7: {
          name: 'MP7',
          imgUrl: 'Img/MP7.png',
        },
        krissVector: {
          name: 'KRISS Vector',
          imgUrl: 'Img/kriss-vector.png',
        },
      }
    },
    assault: {
      name: 'Assault',
      list: ['AK-47', 'FN-SCAR', 'M4', 'AR-15', 'M16'],
      guns: {
        ak47: {
          name: 'AK-47',
          imgUrl: 'Img/AK-47.png',
        },
        scar17: {
          name: 'FN-SCAR',
          imgUrl: 'Img/SCAR-17.png',
        },
        m4: {
          name: 'M4',
          imgUrl: 'Img/M4.png',
        },
        ar15: {
          name: 'AR-15',
          imgUrl: 'Img/M4.png',
        },
        m16: {
          name: 'M16',
          imgUrl: 'Img/M4.png',
        }
      }
    },
    pistol: {
      name: 'Pistol',
      list: ['1911', 'Glock', 'Sig', 'Beretta', 'Desert Eagle', 'AAP-01', 'Hi-Capa'],
      guns: {
        1911: {
          name: '1911',
          imgUrl: 'Img/1911.png',
        },
        glock: {
          name: 'Glock',
          imgUrl: 'Img/Glock-x16.png',
        },
        sig: {
          name: 'Sig',
          imgUrl: 'Img/Sig-m19.png',
        },
        beretta: {
          name: 'Beretta',
          imgUrl: 'Img/Beretta-renetti.png',
        },
        desertEagle: {
          name: 'Desert Eagle',
          imgUrl: 'Img/Desert-eagle-50.png',
        },
        aap01: {
          name: 'AAP-01',
        },
        hicapa: {
          name: 'Hi-Capa',
        },
      }
    },
  }
}

export default GunTable;
