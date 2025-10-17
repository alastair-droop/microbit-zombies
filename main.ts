radio.onReceivedNumber(function (receivedNumber) {
    if (radio.receivedPacket(RadioPacketProperty.SignalStrength) > ThresholdSignalStrength) {
        if (receivedNumber <= 0) {
            UpdateInfection()
        }
    }
})
function UpdateDisplay () {
    if (Health > 0) {
        led.setBrightness(Math.map(Health, 1, MaxHealth, 1, 255))
        basic.showIcon(IconNames.Heart)
    } else {
        led.setBrightness(125)
        basic.showIcon(IconNames.Skull)
    }
}
function UpdateInfection () {
    if (Health > 0) {
        Health += -1
        basic.showIcon(IconNames.SmallHeart)
    }
    UpdateDisplay()
    basic.pause(TimeoutTime)
}
input.onButtonPressed(Button.AB, function () {
    Health = 0
    UpdateDisplay()
})
let Health = 0
let TimeoutTime = 0
let ThresholdSignalStrength = 0
let MaxHealth = 0
radio.setGroup(128)
MaxHealth = 5
ThresholdSignalStrength = -160
TimeoutTime = 5000
Health = MaxHealth
UpdateDisplay()
basic.forever(function () {
    radio.sendNumber(Health)
})
