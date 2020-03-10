import Utils from '../app/Utils';

const PREFIX = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
let key = 'AIzaSyA-uzx0QUjC9nOoh7hQwJts6Bbdhl48lDo';
async function getNearBy(lat, long, radius) {
    let res = '';
    const url = `${PREFIX}location=${lat},${long}&radius=${radius}&key=${key}`;
    try {
        res = await fetch(url);
        res = await res.json();
        if (res.status == 'OK') return res;
    } catch (error) {
        Utils.nlog('error', error);
    }
}
export { getNearBy };