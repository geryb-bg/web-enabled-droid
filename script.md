# Connect To Droid

## connect.js:

1. connectToDroid1
2. connectToDroid2
3. radioServiceUuid
4. Add radioServiceUuid to optional services
5. connectToDroid3
6. connectToDroid4
7. connectImport

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
9. promiseenableDevMode

# Get Primary Service:

## connect.js

1. controlUuid
2. add service UUID to optionalServices
3. getControlChar

# Droid controller class

1. droidctor
2. writeValueToChar:
     - checksum
    - packets
    - array
3. setColour - 0 says don't save this as default colour
4. roll - Roll command data: speed, direction (MSB), direction (LSB), 1=go
5. stop - 0=stop
6. setHeading
7. (ng only) reference