export class DroidConnector {
    
    constructor(radioService) {
        this.radioService = radioService;
        this.antiDosCharUuid = '22bb746f-2bbd-7554-2d6f-726568705327';
        this.txPowerCharUuid = '22bb746f-2bb2-7554-2d6f-726568705327';
        this.wakeCpuCharUuid = '22bb746f-2bbf-7554-2d6f-726568705327';
    }

    enableDevMode() {
        return this.getantiDosChar()
            .then(this.setAntiDosValue)
            .then(_ => this.gettxPowerChar())
            .then(this.setTxPowerValue)
            .then(_ => this.getwakeCpuChar())
            .then(this.setWakeCpuValue);
    }

    getantiDosChar() {
        return this.radioService.getCharacteristic(this.antiDosCharUuid);
    }

    setAntiDosValue(characteristic) {
        const bytes = new Uint8Array('011i3'.split('').map(c => c.charCodeAt(0)));
        return characteristic.writeValue(bytes);
    }

    gettxPowerChar() {
        return this.radioService.getCharacteristic(this.txPowerCharUuid);
    }

    setTxPowerValue(characteristic) {
        const array = new Uint8Array([0x07]);
        return characteristic.writeValue(array);
    }

    getwakeCpuChar() {
        return this.radioService.getCharacteristic(this.wakeCpuCharUuid);
    }

    setWakeCpuValue(characteristic) {
        const array = new Uint8Array([0x01]);
        return characteristic.writeValue(array);
    }
}