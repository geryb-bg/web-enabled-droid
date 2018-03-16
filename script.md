# Enable Dev Mode:

## droid-connector.js:

1. connectorctor
2. create enableDevMode method (empty)
3. getChar - antiDos
4. setAntiDosValue
5. getChar - txPower
6. setTxPowerValue
7. getChar - wakeCpu
8. setWakeCpuValue
9. enableDevMode

# Now call that:

## connect.js:

1. import DroidConnector
2. radioServiceUuid
3. connectToDroid

# Get Primary Service:

## connect.js

1. controlUuid
2. add service UUID to optionalServices
3. getControlChar

# Droid controller class

1. droidctor
2. writeValueToChar:

    - const deviceId = 0x02; - virtual device 2 is for sphero features
    - const dataLength = data.byteLength + 1;
    - const sum = data.reduce((a, b) => a + b);
    - const seq = this.sequence & 255;
    - this.sequence += 1
    - checksum
    - packets
    - array
3. setColour - 0 says don't save this as default colour
4. Roll command data: speed, direction (MSB), direction (LSB), 1=go - roll
5. 0=stop - stop