def on_received_number(receivedNumber):
    if radio.received_packet(RadioPacketProperty.SIGNAL_STRENGTH) > -160:
        if receivedNumber <= 0:
            UpdateInfection()
radio.on_received_number(on_received_number)

def UpdateDisplay():
    if Health > 0:
        led.set_brightness(Math.map(Health, 1, MaxHealth, 1, 255))
        basic.show_icon(IconNames.HEART)
    else:
        led.set_brightness(125)
        basic.show_icon(IconNames.SKULL)
def UpdateInfection():
    global Health
    if Health > 0:
        Health += -1
        basic.show_icon(IconNames.SMALL_HEART)
    UpdateDisplay()
    basic.pause(5000)

def on_button_pressed_ab():
    global Health
    Health = 0
    UpdateDisplay()
input.on_button_pressed(Button.AB, on_button_pressed_ab)

Health = 0
MaxHealth = 0
radio.set_group(1)
MaxHealth = 5
Health = MaxHealth
UpdateDisplay()

def on_forever():
    radio.send_number(Health)
basic.forever(on_forever)
