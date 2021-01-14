const PROXY_URL = "https://quiet-plains-83026.herokuapp.com/";
const API = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?CMC_PRO_API_KEY=ce38fba1-db16-49a7-802e-94ad5d7d0902'
const elementoNombre = document.querySelectorAll('.nombre');
const elementoPrecio = document.querySelectorAll('.precio');
const elementoSimbolo = document.querySelectorAll('.simbolo');
const elementoVariacion = document.querySelectorAll('.variacion');
const elementoImagen = document.querySelectorAll('.img');
const elementoUsd = document.querySelectorAll('.usd');
const elementoInput = document.querySelectorAll('.input');
const elementoPrecioOculto = document.querySelectorAll('.precioOculto');
const elementoBoton = document.querySelectorAll('.boton');
const elementoBotonSat = document.querySelectorAll('.botonsat');
const elementoInputSatoshis = document.querySelectorAll('.inputSat');
const elementoUsdSat = document.querySelectorAll('.usdsat');


const fetchData = (api_url) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET', api_url, true);
        xhttp.onreadystatechange = () => {
        if (xhttp.readyState === 4) {
            (xhttp.status === 200)
                ? resolve(JSON.parse(xhttp.responseText))
                : reject(new Error('Test Error', api_url))
        }
    }
    xhttp.send();
    });
}
const obtain = async ()=>{
    try {
        const obtainData = await fetchData(PROXY_URL + API);
        
//         let precio = obtainData.data[0].quote.USD.price;
//         precio = precio.toFixed(2);
//         precio = precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//         precio = `$ ${precio} USD`;
//         elementoPrecio.innerHTML = precio;
// //--------------------------------------------------------
        const obtenerMostrar = num => {
            let precio = obtainData.data[num].quote.USD.price;
            elementoPrecioOculto[num].innerHTML = precio;
            precio = precio.toFixed(2);
            precio = precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            precio = `$ ${precio} USD`;
            elementoPrecio[num].innerHTML = precio;
            elementoNombre[num].innerHTML = obtainData.data[num].name;
            elementoSimbolo[num].innerHTML = obtainData.data[num].symbol;
            let variacion = obtainData.data[num].quote.USD.percent_change_24h
            variacion = variacion.toFixed(2);
            if (variacion.includes('-')) {
                variacion = variacion.slice(1, -1);
                variacion = variacion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                variacion = `-%${variacion}`;
                elementoVariacion[num].style.color = '#FC5130';
            }else{
                variacion = variacion.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                variacion = `%${variacion}`;
            }
            switch (obtainData.data[num].name) {
                case 'Bitcoin':
                    elementoImagen[num].setAttribute('src', 'assets/Bitcoin.svg');
                    break;
                case 'XRP':
                    elementoImagen[num].setAttribute('src', 'assets/XRP.svg');
                    break;
                case 'Ethereum':
                    elementoImagen[num].setAttribute('src', 'assets/Ethereum.svg');
                    break;
                case 'Tether':
                    elementoImagen[num].setAttribute('src', 'assets/Tether.svg');
                    break;
                case 'Litecoin':
                    elementoImagen[num].setAttribute('src', 'assets/Litecoin.svg');
                    break;
                case 'Bitcoin Cash':
                    elementoImagen[num].setAttribute('src', 'assets/Bitcoin cash.svg');
                    break;
                case 'Chainlink':
                    elementoImagen[num].setAttribute('src', 'assets/chainlink.svg');
                    break;
                case 'Doge':
                    elementoImagen[num].setAttribute('src', 'assets/doge.svg');
                    break;
                case 'Zcash':
                    elementoImagen[num].setAttribute('src', 'assets/zcash.svg');
                    break;
                case 'Stellar':
                    elementoImagen[num].setAttribute('src', 'assets/stellar.svg');
                    break;
                default:
                    elementoImagen[num].setAttribute('src', 'assets/other.svg');
                    break;
            }
            elementoVariacion[num].innerHTML = variacion;
        }
        obtenerMostrar(0);
        obtenerMostrar(1);
        obtenerMostrar(2);
        obtenerMostrar(3);
        obtenerMostrar(4);
        obtenerMostrar(5);
        obtenerMostrar(6);
        obtenerMostrar(7);
        obtenerMostrar(8);
        obtenerMostrar(9);
        const convertirADolares = num =>{
            let convertirPrecio = elementoPrecioOculto[num].innerHTML;
            elementoBoton[num].addEventListener('click', ()=>{
                let conversion = elementoInput[num].value*convertirPrecio;
                if (num === 5) {
                    conversion = conversion.toFixed(7);
                }else{
                    conversion = conversion.toFixed(4);
                }

                elementoUsd[num].innerHTML = conversion;
            });
        }
        const convertirSatoshis = () =>{
            elementoBotonSat[0].addEventListener('click', ()=>{
                let convertirPrecio = elementoPrecioOculto[0].innerHTML;
                let conversion = elementoInputSatoshis[0].value*convertirPrecio;
                conversion = conversion/100000000;
                conversion = conversion.toFixed(7);
                elementoUsdSat[0].innerHTML = conversion;
            });
        }
        convertirSatoshis();
        convertirADolares(0);
        convertirADolares(1);
        convertirADolares(2);
        convertirADolares(3);
        convertirADolares(4);
        convertirADolares(5);
        convertirADolares(6);
        convertirADolares(7);
        convertirADolares(8);
        convertirADolares(9);
    } catch (error) {
        console.error(error)
    }
}
obtain();