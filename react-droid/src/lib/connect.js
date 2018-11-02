import { DroidConnector } from './droid-connector.js';

const radioServiceUuid = '22bb746f-2bb0-7554-2d6f-726568705327';
const controlServiceUuid = '22bb746f-2ba0-7554-2d6f-726568705327';
const controlCharUuid = '22bb746f-2ba1-7554-2d6f-726568705327';

export function connectToDroid() {
    let droidGattProfile;
    
    return navigator.bluetooth.requestDevice({
        filters: [{ namePrefix: 'BB' }],
        optionalServices: [
            radioServiceUuid,
            controlServiceUuid
        ]
    })
        .then(device => device.gatt.connect())
        .then(gatt => {
            droidGattProfile = gatt;
            return droidGattProfile.getPrimaryService(radioServiceUuid);
        })
        .then(service => {
            const droidConnector = new DroidConnector(service);
            return droidConnector.enableDevMode();
        })
        .then(_ => droidGattProfile);
}

export function getControlChar(gattProfile) {
    return gattProfile.getPrimaryService(controlServiceUuid)
        .then(controlService => controlService.getCharacteristic(controlCharUuid))
        .then(controlChar => controlChar);
}